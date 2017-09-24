import { PageType } from './enums/PageType';
import { HomePageData } from './types/HomePageData';
import { ContactPageData } from './types/ContactPageData';
import { AboutPageData } from './types/AboutPageData';
import { MusicPageData } from './types/MusicPageData';
import { LivePageData } from './types/LivePageData';

export type PageData = HomePageData |
                      AboutPageData |
                      MusicPageData |
                      LivePageData  |
                      ContactPageData;

export interface IDatabase {
  getPageData(page: PageType, callback: (data: PageData) => void);
}
