import { Request, Response, Router } from 'express';
import { FireBase } from '../dao/FireBaseDB';
import { PageType } from '../../src/app/common/PageType';
import { PageData } from '../dao/IDatabase';
import { AboutPageData, ContactPageData, HomePageData, LivePageData, MusicPageData } from '../../types';

const apiRouter: Router = Router();
let dal: FireBase = new FireBase();

apiRouter.get('/' + 'Home', (request: Request, response: Response) => {
  dal.getPageData(PageType.HOME, (data: PageData) => {
    const homePageData = data as HomePageData;
    response.send(homePageData);
  });
});

apiRouter.post('/' + 'Home', (request: Request, response: Response) => {
  dal.setPageData(PageType.HOME, request.body)
    .then(() => {
    response.send();
  }).catch(rejected => {
    console.log('Promise was rejected by Database');
    console.log(rejected);
    response.status(500);
    response.statusMessage = rejected;
    response.send();
  })
});

// TODO: extract page urls to mapping and read from there.
apiRouter.post('/' + 'About', (request: Request, response: Response) => {
  dal.setPageData(PageType.ABOUT, request.body)
    .then(() => {
    response.send();
  }).catch(rejected => {
    console.log('Promise was rejected by Database');
    console.log(rejected);
    response.status(500);
    response.statusMessage = rejected;
    response.send();
  })
});

apiRouter.get('/' + 'About', (request: Request, response: Response) => {
  dal.getPageData(PageType.ABOUT, (data: PageData) => {
    response.send(data as AboutPageData);
  });
});

apiRouter.get('/' + 'Music', (request: Request, response: Response) => {
  dal.getPageData(PageType.MUSIC, (data: PageData) => {
    response.send(data as MusicPageData);
  });
});

apiRouter.get('/' + 'Live', (request: Request, response: Response) => {
  dal.getPageData(PageType.LIVE, (data: any) => {
    response.send(data as LivePageData);
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
