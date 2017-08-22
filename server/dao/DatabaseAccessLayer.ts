import * as assert from 'assert';
import * as Q from 'q';
import {HomePageData} from './types/HomePageData';
import {Collection} from './enums/Collection';
import {ContactPageData} from './types/ContactPageData';
import {Utils} from './Utils';
import {PageType} from './enums/PageType';
import {Db} from 'mongodb';

/**
 * Created by atanasbozhkov on 19/04/2017.
 */
export class DatabaseAccessLayer {
  private dbConnection: Db;

  constructor(dbConnection: Db) {
    this.dbConnection = dbConnection;
  }

  private closeDbConnection() {
    if (this.dbConnection !== null) {
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
    if (this.dbConnection) {
      this.dbConnection.collection(collectionName).count((err, result) => {
        assert.equal(err, null);
        if (err) {
          deferred.reject(new Error(JSON.stringify(err)));
        }
        deferred.resolve(result);
      });
    }
    return deferred.promise;
  }

  public getPageData(pageType: PageType): Q.Promise<HomePageData | ContactPageData> {
    let deferred = Q.defer<HomePageData | ContactPageData>();
    if (this.dbConnection) {
      this.dbConnection.collection(Collection.PAGES).findOne({'pageType': pageType})
        .then((data) => {
          if (data === null) {
            deferred.reject(new Error(JSON.stringify('Error getting page data')));
          } else {
            if (pageType === PageType.HOME) {
              deferred.resolve(Utils.HopePageDataFromJSON(data));
            } else if (pageType === PageType.CONTACT) {
              deferred.resolve(Utils.ContactPageDataFromJSON(data));
            }

          }
        });


    }
    return deferred.promise;
  }

  private create<T>(c: { new(): T }) {
    return new c();
  }


}

