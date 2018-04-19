import * as fs from 'fs';
import * as moment from 'moment';

const BASE_64 = 'base64';
export const ASSET_PATH = './src/assets/img';
export enum ImageFileType {
  PNG = 'png',
  JPEG = 'jpeg',
  JPG = 'jpg',
}

export enum ImageType {
  THUMBNAIL = 'thumbnail',
  FULL_SIZE = 'full-size'
}

export class ImageUploader {

  constructor() {

  }

  public uploadImage(imageData: any, imageType: ImageType, fileType: ImageFileType) {
    console.log(`Got image ${imageData}, ${imageType}`);
    const pattern = `^data:image\/${fileType};base64,`;
    const regex = new RegExp(pattern);
    let fileName = `.${ASSET_PATH}/${imageType} - ${moment.now()}.${fileType}`;
    let headerRemovedData = imageData.replace(regex, '');

    fs.writeFile(fileName, headerRemovedData, BASE_64, (err) => {
      if ( err ) {
        console.log('Error saving file');
        console.log(err)
      } else {
        console.log('File saved successfully' + fileName);
      }
    });
  }
}
