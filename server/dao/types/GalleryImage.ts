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
