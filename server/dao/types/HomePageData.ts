/**
 * Created by atanasbozhkov on 07/11/2016.
 */
export class HomePageData {

  private _firstName: string;
  private _lastName: string;
  private _moto: string;
  private _photoUrl: string;

  constructor(firstName: string, lastName: string, moto: string, photoUrl: string) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._moto = moto;
    this._photoUrl = photoUrl;
  }

  get photoUrl(): string {
    return this._photoUrl;
  }
  get moto(): string {
    return this._moto;
  }
  get lastName(): string {
    return this._lastName;
  }
  get firstName(): string {
    return this._firstName;
  }
}
