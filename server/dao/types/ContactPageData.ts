/**
 * Created by atanasbozhkov on 08/11/2016.
 */
export class ContactPageData {

  email: string;
  phone: string;
  location: string;

  constructor(contactPageData: Partial<ContactPageData>) {
    Object.assign(this, contactPageData);
  }
}
