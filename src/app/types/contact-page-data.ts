/**
 * Created by atanasbozhkov on 08/11/2016.
 */
export class ContactPageData {

  email: string;
  phone: string;
  location: string;
  twitter: string;
  youtube: string;

  constructor(galleryImage: Partial<ContactPageData>) {
    Object.assign(this, galleryImage);
  }
}
