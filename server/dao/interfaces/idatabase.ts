import { PageType } from '../../../src/app/common/page-models/page-type';
import { AboutPageData, ContactPageData, GalleryPageData, HomePageData, LivePageData, MusicPageData } from '../../../types/index';

export type PageData = HomePageData    |
                      AboutPageData    |
                      MusicPageData    |
                      LivePageData     |
                      GalleryPageData  |
                      ContactPageData;

export interface IDatabase {
  getPageData(page: PageType, callback: (data: PageData) => void);
  setPageData(page: PageType, padeData: PageData)
}
