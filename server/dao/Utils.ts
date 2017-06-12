import {HomePageData} from './types/HomePageData';
/**
 * Created by atanasbozhkov on 03/05/2017.
 */
export class Utils {

  static JSONtoHomePageData(jsonData: JSON): HomePageData {
    return new HomePageData(jsonData['firstWord'], jsonData['secondWord'], jsonData['moto'], jsonData['pictureUrl']);
  }
}
