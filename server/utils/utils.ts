import {ImageFileType} from "../dao/image-uploader";

export class Utils {
  public static getImageFileType(base64Data: string): ImageFileType {
    const fileType = base64Data.substring("data:image/".length, base64Data.indexOf(";base64"));
    console.log(`Got type ${fileType}`);
    let imageFileType = ImageFileType[fileType.toUpperCase()];
    console.log(`Mapped to ${imageFileType}`);
    return imageFileType as ImageFileType;
  }
}
