import {IImage} from "../image-cache";

export interface IImageDatabse {
  getImage(imageKey: string): IImage;
  listImages(): Array<IImage>;
  saveImage(image: IImage): void;
}
