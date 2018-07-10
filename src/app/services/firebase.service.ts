import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { firebaseDevConfig, firebaseConfig } from '../config';
import {PageData} from '../data-service.service';
import * as types from '../types/index';
import {Observable} from 'rxjs';
import {LiveEvent, LivePageData, PageType} from '../types';
import {IImage} from './interfaces/iimage';
import { get } from 'lodash';
import {ImageType} from './interfaces/image-type';

export class FirebaseService {

  private fireBase: firebase.app.App;
  private database: firebase.database.Database;
  private imageStorage: any;
  private readonly BUCKET_NAME: string = 'marina-website.appspot.com';
  private DEV_MODE = true;
  constructor() {
    // Initialize Firebase
    if ( this.DEV_MODE ) {
      console.warn(`Using Firebase in DEV mode`);
      this.fireBase = firebase.initializeApp(firebaseDevConfig);
    } else {
      this.fireBase = firebase.initializeApp(firebaseConfig);
    }
    this.database = this.fireBase.database();
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

  addNewLiveEvent(liveEvent: Partial<LiveEvent>): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const newEventRef = this.database.ref('pages/' + PageType.LIVE + '/liveEvents')
        .push({
          date: liveEvent.date.toISOString(),
          eventLocation: liveEvent.eventLocation,
          eventName: liveEvent.eventName,
          facebookLink: liveEvent.facebookLink,
          googleMapsLink: liveEvent.googleMapsLink
        });
      newEventRef.then(something => console.log(something));
      resolve(true);
    });
  }

  removeEvent(eventId: string): Promise<boolean> {
    return new Promise((resolve => {
      const ref = this.database.ref('pages/' + PageType.LIVE + '/liveEvents');
      ref.child(eventId).remove().then(removed => {
        console.log(removed);
        resolve(true);
        // TODO: Nasco excpetion handling.

      });
    }));
  }

  getPageData(page: PageType): Observable<PageData> {
    return new Observable(obs => {
      this.database.ref('pages/' + page)
        .on('value', snapshot => {
          switch (page) {
            case PageType.HOME:
              obs.next(new types.HomePageData(snapshot.val()));
              break;
            case PageType.ABOUT:
              obs.next(new types.AboutPageData(snapshot.val()));
              break;
            case PageType.MUSIC:
              obs.next(new types.MusicPageData(snapshot.val()));
              break;
            case PageType.GALLERY:
              obs.next(new types.GalleryPageData(snapshot.val()));
              break;
            case PageType.CONTACT:
              obs.next(new types.ContactPageData(snapshot.val()));
              break;
            case PageType.LIVE:
              obs.next(new LivePageData(snapshot.val()));
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
