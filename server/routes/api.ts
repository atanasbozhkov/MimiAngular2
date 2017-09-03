import {Request, Response, Router} from 'express';
import {Db, MongoClient} from 'mongodb';
import {DatabaseAccessLayer} from '../dao/DatabaseAccessLayer';
import {PageType} from '../dao/enums/PageType';
import {HomePageData} from '../dao/types/HomePageData';

const apiRouter: Router = Router();

const host = 'mongodb://127.0.0.1:';
const port = 27017;
const dbName = 'MarinaStaneva';
const shareItUrl: string = host + port + '/' + dbName;
let dal;

MongoClient.connect(shareItUrl, (err, db: Db) => {
  console.log('Connected correctly to MongoDB server.');
  dal = new DatabaseAccessLayer(db);
});

apiRouter.get('/' + 'Home', (request: Request, response: Response) => {
  dal.getPageData(PageType.HOME).then((data: HomePageData) => {
    response.json(data);
  });

});

export {apiRouter};
