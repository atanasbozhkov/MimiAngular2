/**
 * Created by atanasbozhkov on 06/02/2017.
 */

export class GalleryImage {
  href: string;
  thumb: string;

  constructor(galleryImage: Partial<GalleryImage>) {
    Object.assign(this, galleryImage);
  }

}

export class GalleryPageData {
  galleryImages: Array<GalleryImage>;

  constructor(galleryImage: Partial<GalleryPageData>) {
    Object.assign(this, galleryImage);
  }

}
