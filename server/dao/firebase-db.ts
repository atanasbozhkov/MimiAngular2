import * as firebase from 'firebase';
import { firebaseConfig } from '../config';
import { IDatabase, PageData } from './interfaces/idatabase';
import { PageType } from '../../src/app/common/page-models';
import {
  AboutPageData,
  ContactPageData,
  GalleryPageData,
  HomePageData,
  LivePageData,
  MusicPageData
} from '../../types';
import {IImageDatabse} from './interfaces/iimage-databse';
import {IImage} from './image-cache';
import {ImageType} from './image-helper';
import {BucketQuery} from 'google-cloud__storage';
import { get } from 'lodash';
import {Observable} from 'rxjs/Rx';

const Storage = require('@google-cloud/storage');
/**
 * Created by atanasbozhkov on 19/04/2017.
 */
export class FireBase implements IDatabase, IImageDatabse {

  private fireBase: firebase.app.App;
  private database: firebase.database.Database;
  private imageStorage: any;
  private readonly BUCKET_NAME: string = 'marina-website.appspot.com';

  constructor() {
    // Initialize Firebase
    this.fireBase = firebase.initializeApp(firebaseConfig);
    this.database = this.fireBase.database();
    this.imageStorage = Storage({
      keyFilename: 'marina-website-df2a4be29328.json'
    });
  }

  login(email: string, password: string) {
    this.fireBase.auth().signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }

  setPageData(page: PageType, pageData: PageData): Promise<undefined | Error> {
    return new Promise((resolve, reject) => {
      switch (page) {
        case PageType.HOME:
          this.database.ref('pages/' + page).set(pageData)
            .then(() => resolve())
            .catch( rejected => reject(new Error(rejected)));
          break;
        case PageType.ABOUT:
          this.database.ref('pages/' + page).set(pageData)
            .then(() => resolve())
            .catch( rejected => reject(new Error(rejected)));
      }
    });
  }

  getPageData(page: PageType, callback: (data: PageData) => any) {
    return this.database.ref('pages/' + page)
      .once('value')
      .then(snapshot => {
        switch (page) {
          case PageType.HOME:
            callback(new HomePageData(snapshot.val()));
            break;
          case PageType.ABOUT:
            callback(new AboutPageData(snapshot.val()));
            break;
          case PageType.MUSIC:
            callback(new MusicPageData(snapshot.val()));
            break;
          case PageType.GALLERY:
            callback(new GalleryPageData(snapshot.val()));
            break;
          case PageType.CONTACT:
            callback(new ContactPageData(snapshot.val()));
            break;
          case PageType.LIVE:
            let events = [];
            snapshot.val().liveEvents.forEach(function (item) {
              events.push(item);
            });
            callback(new LivePageData({liveEvents: events}))
        }

      }).catch(error => {
        // TODO: maybe fallback to a static data version of the website if db not available?
        console.error(error);
      });
  }

  getImage(imageKey: string): IImage {
    this.imageStorage.bucket(this.BUCKET_NAME).getFile(imageKey).then(result => {
      console.log(result[1]);
    });
    return undefined;
  }

  listImages(): Observable<IImage> {
    return this.getFolderContents('thumbnail');
  }

  private getFolderContents(folder: string): Observable<IImage> {
    const queryOptions: BucketQuery = {
      prefix: `${folder}/`,
      delimiter: '/'
    };
    return Observable.create( observer => {
      this.imageStorage.bucket(this.BUCKET_NAME)
        .getFiles(queryOptions)
        .then(results => {
          const files = get(results, '0');
          if (files) {
            // console.log('Files:');
            files.filter(file => file.metadata.size !== 0) // Filter by size to omit folders.
              .forEach(file => {
                const fileName = get(file.metadata.name.split('/'), '1');
                // console.log(`${fileName}`)
                file.download().then((buffer: Buffer) => {
                  const image: IImage = {
                    key: fileName,
                    imageData: buffer.toString('base64'),
                    thumbnailData: buffer.toString('base64')
                  };
                  observer.next(image);
                })
              });
          }
        });
    });

  }

  saveImage(image: IImage): void {
    this.imageStorage.ref().child(ImageType.FULL_SIZE).child(image.key).put(image.imageData).then(snapshot => {
      console.log(`uploaded ${image.key}`);
      console.log(`download URL ${snapshot.downloadURL}`);
    })
  }

}
