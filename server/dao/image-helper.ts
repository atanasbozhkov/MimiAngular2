import * as fs from 'fs';
import {IImage, IImageCache} from "./image-cache";
import {IImageDatabse} from "./interfaces/iimage-databse";
import {Observable} from "rxjs/Rx";

const BASE_64 = 'base64';
export const DEV_ASSET_PATH = '/src/assets/img';
export const PROD_ASSET_PATH = '/dist/client/assets';
export const IMAGE_LINK = 'assets/img';
// TODO: Nasco - figure out a stricter compare?
export const ASSET_PATH = process.env.NODE_ENV ? PROD_ASSET_PATH : DEV_ASSET_PATH;
export enum ImageFileType {
  PNG = 'png',
  JPEG = 'jpeg',
  JPG = 'jpg',
}

export enum ImageType {
  THUMBNAIL = 'thumbnail',
  FULL_SIZE = 'full-size'
}

export class ImageHelper {

  constructor(private readonly imageCache: IImageCache,
              private readonly imageDB: IImageDatabse) {

  }

  public getImage(imageKey: string): IImage {
    const cachedImage = this.imageCache.getImage(imageKey);
    if (cachedImage !== undefined) {
      return cachedImage
    } else {
      let image = this.imageDB.getImage(imageKey);
      this.imageCache.saveImage(image);
      return image;
    }
  }

  public uploadImage(fileName: string, imageData: string, thumbnailData: string) {
    console.log(`Got image ${imageData}`);
    const image: IImage = {
      key: fileName,
      imageData,
      thumbnailData
    };
    this.imageCache.saveImage(image);
    this.imageDB.saveImage(image)
  }

  public listImages(): Observable<IImage> {
    return this.imageDB.listImages();
  }
}
