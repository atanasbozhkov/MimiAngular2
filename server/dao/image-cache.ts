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

export class ImageCache implements  IImageCache {
  private cache: Map<string, IImage> = new Map();
  constructor() {

  }

  getImage(imageKey: string): IImage | undefined {
    const image = this.cache.get(imageKey);
    return image
  }

  saveImage(image: IImage): void {
    this.cache.set(image.key, image);
  }

  dispose(imageKey: string) {
    this.cache.delete(imageKey);
  }

}
