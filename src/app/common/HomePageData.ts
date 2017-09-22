/**
 * Created by atanasbozhkov on 07/11/2016.
 */
export class HomePageData {

  firstName: string;
  lastName: string;
  moto: string;
  photoUrl: string;

  constructor(firstName: string, lastName: string, moto: string, photoUrl: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.moto = moto;
    this.photoUrl = photoUrl;
  }
}
