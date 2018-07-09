import { capitalize } from 'lodash';
import { PageType } from "../types";
const API = 'API/';

export function urlMapping(pageType: PageType) {
  return API.concat(capitalize(pageType));
}
