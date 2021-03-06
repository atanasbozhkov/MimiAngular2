import { Injectable } from '@angular/core';
import {PageType} from '../common/page-models/index';
import * as firebase from 'firebase';
import { firebaseConfig } from '../config/index';
import {PageData} from '../data-service.service';
import * as types from '../types/index';
import {Observable} from 'rxjs';
import {LivePageData} from '../types/index';
import {IImage} from './interfaces/iimage';
import { get } from 'lodash';
import {ImageType} from './interfaces/image-type';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  private fireBase: firebase.app.App;
  private database: firebase.database.Database;
  private imageStorage: any;
  private readonly BUCKET_NAME: string = 'marina-website.appspot.com';

  constructor() {
    // Initialize Firebase
    this.fireBase = firebase.initializeApp(firebaseConfig);
    this.database = this.fireBase.database();
    // this.imageStorage = Storage({
    //   keyFilename: 'marina-website-df2a4be29328.json'
    // });
  }

  login(email: string, password: string) {
    this.fireBase.auth().signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
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

  getPageData(page: PageType): Promise<PageData> {
    return new Promise(resolve => {
      this.database.ref('pages/' + page)
        .once('value')
        .then(snapshot => {
          switch (page) {
            case PageType.HOME:
              resolve(new types.HomePageData(snapshot.val()));
              break;
            case PageType.ABOUT:
              resolve(new types.AboutPageData(snapshot.val()));
              break;
            case PageType.MUSIC:
              resolve(new types.MusicPageData(snapshot.val()));
              break;
            case PageType.GALLERY:
              resolve(new types.GalleryPageData(snapshot.val()));
              break;
            case PageType.CONTACT:
              resolve(new types.ContactPageData(snapshot.val()));
              break;
            case PageType.LIVE:
              const events = [];
              snapshot.val().liveEvents.forEach(function (item) {
                events.push(item);
              });
              resolve(new LivePageData({liveEvents: events}));
          }
        });
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
    // const queryOptions: BucketQuery = {
    //   prefix: `${folder}/`,
    //   delimiter: '/'
    // };
    return Observable.create( observer => {
      this.imageStorage.bucket(this.BUCKET_NAME)
        .getFiles()
        .then(results => {
          const files = get(results, '0');
          if (files) {
            // console.log('Files:');
            files.filter(file => file.metadata.size !== 0) // Filter by size to omit folders.
              .forEach(file => {
                const fileName = get(file.metadata.name.split('/'), '1');
                // console.log(`${fileName}`)
                file.download().then((buffer) => {
                  const image: IImage = {
                    key: fileName,
                    imageData: buffer.toString('base64'),
                    thumbnailData: buffer.toString('base64')
                  };
                  observer.next(image);
                });
              });
          }
        });
    });

  }

  saveImage(image: IImage): void {
    this.imageStorage.ref().child(ImageType.FULL_SIZE).child(image.key).put(image.imageData).then(snapshot => {
      console.log(`uploaded ${image.key}`);
      console.log(`download URL ${snapshot.downloadURL}`);
    });
  }
}
