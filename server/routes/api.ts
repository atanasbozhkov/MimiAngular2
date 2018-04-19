import { Request, Response, Router } from 'express';
import { FireBase } from '../dao/firebase-db';
import { PageType } from '../../src/app/common/page-models';
import { PageData } from '../dao/idatabase';
import { AboutPageData, ContactPageData, HomePageData, LivePageData, MusicPageData } from '../../types';
import { urlMapping } from '../../src/app/common/url-mapping';
import { ImageFileType, ImageType, ImageUploader } from '../dao/image-uploader';
import { Utils } from '../utils/utils';
import Multer = require('multer');
import { ImageUploadForm } from '../../types/form-data-types';

const apiRouter: Router = Router();
const dal: FireBase = new FireBase();
const imageUploader: ImageUploader = new ImageUploader();
let MAX_UPLOAD_SIZE = 25 * 1024 * 1024;
// Configure Multer to accept files up to 25MBs
const upload = Multer({
  limits: { fieldSize: MAX_UPLOAD_SIZE }
});

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
apiRouter.post(urlMapping(PageType.ABOUT), (request: Request, response: Response) => {
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

apiRouter.post('/' + 'UploadImage', upload.array('fullSizeImage') , (req: Request, res: Response) => {
  const fullSizeImage = (req.body as ImageUploadForm).fullSizeImage;
  const croppedImage = (req.body as ImageUploadForm).croppedImage;
  imageUploader.uploadImage(fullSizeImage, ImageType.FULL_SIZE, Utils.getImageFileType(fullSizeImage));
  imageUploader.uploadImage(croppedImage, ImageType.THUMBNAIL, Utils.getImageFileType(croppedImage));
  res.send();
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
