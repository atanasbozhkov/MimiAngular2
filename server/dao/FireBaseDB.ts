import * as firebase from 'firebase';
import { firebaseConfig } from '../config';
import { IDatabase, PageData } from './IDatabase';
import { PageType } from './enums/PageType';
import { AboutPageData, ContactPageData, GalleryPageData, HomePageData, LivePageData, MusicPageData } from '../../types';

/**
 * Created by atanasbozhkov on 19/04/2017.
 */
export class FireBase implements IDatabase {

  private fireBase: firebase.app.App;
  private database: firebase.database.Database;

  constructor() {
    // Initialize Firebase
    this.fireBase = firebase.initializeApp(firebaseConfig);
    this.database = this.fireBase.database();
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

  setPageData(page: PageType, pageData: PageData) {
    switch (page) {
      case PageType.HOME:
        this.database.ref('pages/' + page).set(pageData);
        break;
    }
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

}
