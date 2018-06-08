import { Request, Response, Router } from 'express';
import { FireBase } from '../dao/firebase-db';
import { PageType } from '../../src/app/common/page-models';
import { PageData } from '../dao/interfaces/idatabase';
import { AboutPageData, ContactPageData, HomePageData, LivePageData, MusicPageData } from '../../types';
import { urlMapping } from '../../src/app/common/url-mapping';
import {ImageType, ImageHelper, ImageFileType} from '../dao/image-helper';
import Multer = require('multer');
import { ImageUploadForm } from '../../types/form-data-types';
import uuid = require('uuid');
import {IImage, IImageCache, ImageCache} from '../dao/image-cache';
import {FileManager} from '../dao/file-manager';
import {AssetType, File} from '../dao/interfaces/ifile-manager'

const apiRouter: Router = Router();
const dal: FireBase = new FireBase();
const imageCache: IImageCache = new ImageCache();
const fileManager: FileManager = new FileManager();
const imageHelper: ImageHelper = new ImageHelper(imageCache, dal);
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

function getImageExtension(base64Image: string): string {
  // TODO: Make safer
  return base64Image.split('data:image/')[1].split(';')[0];
}

apiRouter.post('/' + 'UploadImage', upload.array('fullSizeImage') , (req: Request, res: Response) => {
  const fullSizeImage = (req.body as ImageUploadForm).fullSizeImage;
  const croppedImage = (req.body as ImageUploadForm).croppedImage;
  const fileName = uuid();

  fileManager.saveFile({
    id: 'fullsize/' + fileName,
    fileExtension: getImageExtension(fullSizeImage),
    data: Buffer.from(fullSizeImage)
  });

  fileManager.saveFile({
    id: 'thumbnail/' + fileName,
    fileExtension: getImageExtension(croppedImage),
  data: Buffer.from(croppedImage)
  });
  res.send();
});

apiRouter.get('/' + 'GetImages', (request: Request, response: Response) => {
  response.send(fileManager.listFiles(AssetType.IMAGE));
  response.end();
});

apiRouter.get('/' + 'GetImage', (request: Request, response: Response) => {
  // TODO: Read file name from the query param
  const fileName = request.query.imageKey;
  const imageFile: File = fileManager.readFile(fileName, AssetType.IMAGE);
  if (imageFile !== undefined) {
    const contType = 'image/' + imageFile.fileExtension;
    const data = imageFile.data;
    response.writeHead(200, {
      'Content-Type': contType,
      'Content-Length': data.length});
    response.end(data, 'binary');
  } else {
    response.end(JSON.stringify({ error: 'Image not found.'}));
  }
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
