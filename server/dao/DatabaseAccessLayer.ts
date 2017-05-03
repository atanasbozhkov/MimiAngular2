import * as assert from "assert";
import * as Q from "Q";
import {promise} from "selenium-webdriver";
import {LivePage} from "./LivePage";
import {Pages} from "./Pages";
import Deferred = promise.Deferred;
import {HomePageData} from "./types/HomePageData";
/**
 * Created by atanasbozhkov on 19/04/2017.
 */
export class DatabaseAccessLayer {
  private dbConnection: any;
  private PagesCollection: string = 'Pages';
  private PageNameField: string = 'pageName';

  constructor(dbConnection: any) {
    this.dbConnection = dbConnection;
  }

  private closeDbConnection() {
    if (this.dbConnection != null) {
      this.dbConnection.close();
      this.dbConnection = null;
    }
  }

  public insertDocument(document: any, collectionName: string): any {
    let deferred = Q.defer();
    this.dbConnection.collection(collectionName).insertOne(document, (err, result) => {
      assert.equal(err, null);
      if (err) {
        deferred.reject(new Error(JSON.stringify(err)));
      }
      deferred.resolve(result);
    });

    return deferred.promise;
  }

  // Get the count of all documents in the collection.
  public getDocumentCount(collectionName: string): any {
    let deferred = Q.defer();
    console.log(this.dbConnection);
    this.dbConnection && this.dbConnection.collection(collectionName).count((err, result) => {
      assert.equal(err, null);
      if (err) {
        deferred.reject(new Error(JSON.stringify(err)));
      }
      deferred.resolve(result);
    });
    return deferred.promise;
  }


  public getHomePageData(): Q.Promise<JSON> {
    let deferred = Q.defer<JSON>();
    if (this.dbConnection) {
      let document = this.dbConnection.collection(this.PagesCollection).findOne({'pageName': Pages.Home});
      if (document == null) {
        deferred.reject(new Error(JSON.stringify('')));
      } else {
        deferred.resolve(document);
      }
    }
    return deferred.promise;
  }

  public getLivePage(): Q.Promise<LivePage> {
    let deferred = Q.defer<LivePage>();
    if (this.dbConnection) {
      let cursor = this.dbConnection.collection(this.PagesCollection).find({[this.PageNameField]: Pages.Live});
      cursor.each((err, document) => {
        deferred.resolve(document);
      })
    }
    return deferred.promise;
  }

  public getLiveEvents(): Q.Promise<number[]> {
    let deferred = Q.defer<number[]>();
    this.getLivePage().then((livePage: LivePage) => {
      deferred.resolve(livePage.liveEvents);
    }).fail((error) => {
      console.error(error);
      deferred.reject(error);
    });
    return deferred.promise;
  }

}

