/**
 * Created by atanasbozhkov on 08/11/2016.
 */
export class ContactPageData {

  email: string;
  phone: string;
  location: string;

  constructor(email: string,
              phone: string,
              location: string) {
    this.email = email;
    this.phone = phone;
    this.location = location;
  }
}
