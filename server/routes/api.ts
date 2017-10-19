import { Request, Response, Router } from 'express';
import { FireBase } from '../dao/FireBaseDB';
import { PageType } from '../dao/enums/PageType';
import { PageData } from '../dao/IDatabase';
import { AboutPageData, ContactPageData, GalleryPageData, HomePageData, LivePageData, MusicPageData } from '../../types';

const apiRouter: Router = Router();
let dal: FireBase = new FireBase();

apiRouter.get('/' + 'Home', (request: Request, response: Response) => {
  dal.getPageData(PageType.HOME, (data: PageData) => {
    const homePageData = data as HomePageData;
    response.send(homePageData);
  });
});

apiRouter.get('/' + 'About', (request: Request, response: Response) => {
  dal.getPageData(PageType.ABOUT, (data: PageData) => {
    const homePageData = data as AboutPageData;
    response.send(homePageData);
  });
});

apiRouter.get('/' + 'Music', (request: Request, response: Response) => {
  dal.getPageData(PageType.MUSIC, (data: PageData) => {
    const homePageData = data as MusicPageData;
    response.send(homePageData);
  });
});

apiRouter.get('/' + 'Live', (request: Request, response: Response) => {
  dal.getPageData(PageType.LIVE, (data: any) => {
    const homePageData = data as LivePageData;
    response.send(homePageData);
  });
});

apiRouter.get('/' + 'Gallery', (request: Request, response: Response) => {
  dal.getPageData(PageType.GALLERY, (data: PageData) => {
    const homePageData = data as HomePageData;
    response.send(homePageData);
  });
});

apiRouter.get('/' + 'Teaching', (request: Request, response: Response) => {
  dal.getPageData(PageType.TEACHING, (data: PageData) => {
    const homePageData = data as HomePageData;
    response.send(homePageData);
  });
});

apiRouter.get('/' + 'Contact', (request: Request, response: Response) => {
  dal.getPageData(PageType.CONTACT, (data: PageData) => {
    const homePageData = data as ContactPageData;
    response.send(homePageData);
  });
});

export { apiRouter };
