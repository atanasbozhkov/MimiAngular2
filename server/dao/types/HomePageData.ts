/**
 * Created by atanasbozhkov on 07/11/2016.
 */
export class HomePageData {

  private firstName: string;
  private lastName: string;
  private moto: string;
  private photoUrl: string;

  constructor(firstName: string, lastName: string, moto: string, photoUrl: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.moto = moto;
    this.photoUrl = photoUrl;
  }
}
