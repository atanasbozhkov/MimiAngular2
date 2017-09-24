import * as firebase from 'firebase';
import { firebaseConfig } from '../config';
import { IDatabase, PageData } from './IDatabase';
import { PageType } from './enums/PageType';
import { HomePageData } from './types/HomePageData';

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

  public testInsert() {
    // this.database.ref('pages/home')
    //   .set({ name: 'test' })
    //   .catch(error => {
    //     console.error(error.message);
    //   });
  }

  getPageData(page: PageType, callback: (data: PageData) => any) {
    return this.database.ref('pages/' + page)
      .once('value')
      .then(snapshot => {
        callback(new HomePageData(snapshot.val()));
      }).catch(error => {
        // TODO: maybe fallback to a static data version of the website if db not available?
        console.error(error);
      });
  }

}
