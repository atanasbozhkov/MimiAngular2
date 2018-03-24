/**
 * Created by atanasbozhkov on 07/11/2016.
 */
export class HomePageData {

  firstName: string;
  lastName: string;
  moto: string;
  photoUrl: string;

  constructor(data: Partial<HomePageData>) {
    Object.assign(this, data);
  }
}
