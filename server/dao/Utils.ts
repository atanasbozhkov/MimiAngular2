import {HomePageData} from './types/HomePageData';
import {ContactPageData} from './types/ContactPageData';

/**
 * Created by atanasbozhkov on 03/0    static ContactPageDataFromJSON: any;
 5/2017.
 */
export class Utils {

  static HopePageDataFromJSON(jsonData: JSON): HomePageData {
    return new HomePageData(jsonData['firstName'], jsonData['lastName'], jsonData['moto'], jsonData['photoUrl']);
  }

  static ContactPageDataFromJSON(jsonData: JSON): ContactPageData {
    return new ContactPageData(jsonData['email'], jsonData['phone'], jsonData['location']);
  }
}
