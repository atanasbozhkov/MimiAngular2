import * as firebase from 'firebase';
import { firebaseConfig } from '../config';
import { IDatabase, PageData } from './IDatabase';
import { PageType } from './enums/PageType';
import { HomePageData } from './types/HomePageData';
import { AboutPageData } from './types/AboutPageData';
import { MusicPageData } from './types/MusicPageData';
import { LivePageData } from './types/LivePageData';

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
          case PageType.LIVE:
            callback(new LivePageData(snapshot.val()))
        }

      }).catch(error => {
        // TODO: maybe fallback to a static data version of the website if db not available?
        console.error(error);
      });
  }

}
