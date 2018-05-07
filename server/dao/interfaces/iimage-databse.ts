import {IImage} from "../image-cache";
import {Observable} from "rxjs/Rx";

export interface IImageDatabse {
  getImage(imageKey: string): IImage;
  listImages(): Observable<IImage>;
  saveImage(image: IImage): void;
}
