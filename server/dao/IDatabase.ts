import { PageType } from './enums/PageType';
import { HomePageData } from './types/HomePageData';
import { ContactPageData } from './types/ContactPageData';

export type PageData = HomePageData | ContactPageData

export interface IDatabase {
  getPageData(page: PageType, callback: (data: PageData) => void);
}
