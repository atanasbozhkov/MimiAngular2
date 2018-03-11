import { PageType } from './page-models';
import { capitalize } from 'lodash';
const API = 'API/';

export function urlMapping(pageType: PageType) {
  return API.concat(capitalize(pageType));
}
