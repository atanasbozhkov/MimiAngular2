export interface IImage {
  key: string;
  imageData: string; // string or base64?
  thumbnailData: string;
}

export interface IImageCache {
  getImage(imageKey: string): IImage;
  saveImage(image: IImage): void;
  dispose(imageKey: string): void;
}
