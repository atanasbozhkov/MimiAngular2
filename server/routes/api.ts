import { Request, Response, Router } from 'express';
import { FireBase } from '../dao/FireBaseDB';
import { PageType } from '../dao/enums/PageType';
import { PageData } from '../dao/IDatabase';
import { HomePageData } from '../dao/types/HomePageData';

const apiRouter: Router = Router();

const host = 'mongodb://127.0.0.1:';
const port = 27017;
const dbName = 'MarinaStaneva';
const shareItUrl: string = host + port + '/' + dbName;
let dal: FireBase = new FireBase();
dal.getPageData(PageType.HOME, (data: PageData) => {
  const homePageData = data as HomePageData;
  console.log((homePageData).firstName);
  console.log((homePageData).lastName);
  console.log((homePageData).moto);
  console.log((homePageData).photoUrl);
});
// apiRouter.get('/' + 'Home', (request: Request, response: Response) => {
// });

export { apiRouter };
