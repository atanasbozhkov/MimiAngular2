/**
 * Created by atanasbozhkov on 07/11/2016.
 */
export class HomePageData {
  constructor(firstName: string, lastName: string, moto: string, photoUrl: string) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._moto = moto;
    this._photoUrl = photoUrl;
  }

  private _firstName: string;

  get firstName(): string {
    return this._firstName;
  }

  private _lastName: string;

  get lastName(): string {
    return this._lastName;
  }

  private _moto: string;

  get moto(): string {
    return this._moto;
  }

  private _photoUrl: string;

  get photoUrl(): string {
    return this._photoUrl;
  }
}
