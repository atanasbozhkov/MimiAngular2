/**
 * Created by atanasbozhkov on 08/11/2016.
 */
export class ContactPageData {

  email: string;
  phone: string;
  location: string;
  twitter: string;
  youtube: string;

  constructor(email: string,
              phone: string,
              location: string,
              twitter: string,
              youtube: string) {
    this.email = email;
    this.phone = phone;
    this.location = location;
    this.twitter = twitter;
    this.youtube = youtube;
  }
}
// return new ContactPageData('contact@marinastaneva.com',
//   '+44 (0)7399 443763',
//   'London, United Kingdom',
//   'https://twitter.com/StanevaM',
//   'https://www.youtube.com/channel/UCgMM6D_YCuTpsw9fFya691Q');
