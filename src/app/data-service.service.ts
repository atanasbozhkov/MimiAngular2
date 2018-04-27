import { Injectable } from '@angular/core';
import { MenuItemComponent } from './menu-item/menu-item.component';
import {
  AboutPageData,
  ContactPageData,
  GalleryPageData,
  HomePageData,
  LiveEvent,
  MusicPageData
} from '../../types';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/merge';

export type PageData = HomePageData | AboutPageData;

@Injectable()
export class DataServiceService {
  private loggedIn = true;

  constructor(private http: Http) {
  }

  musicPageData(): Observable<MusicPageData> {
    return this.http.get('api/Music')
      .map((res, index) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getMenuItems(): MenuItemComponent[] {
    return [ new MenuItemComponent('Home', '/'),
      new MenuItemComponent('About', '/About'),
      new MenuItemComponent('Music', '/Music'),
      new MenuItemComponent('Live', '/Live'),
      new MenuItemComponent('Gallery', '/Gallery'),
      new MenuItemComponent('Teaching', '/Teaching'),
      new MenuItemComponent('Contact', '/Contact')
    ]
  }

  aboutText(): Observable<AboutPageData> {

    return this.http.get('api/About')
      .map((res, index) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  homePageData(): Observable<HomePageData> {
    return this.http.get('api/Home')
      .map((res, index) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPageData(): Observable<PageData> {
    let mergedObservable = Observable.merge(this.homePageData(), this.aboutText());
    return mergedObservable;
  }

  // Live events month starts from 0 to 11.
  liveEvents(): Observable<{ liveEvents: LiveEvent[] }> {
    return this.http.get('api/Live')
      .map((res, index) => {
        const liveEvents = res.json().liveEvents.map(event => {
          return new LiveEvent(new Date(event.date),
            event.eventName,
            event.eventLocation,
            event.facebookLink,
            event.googleMapsLink);
        });
        return { liveEvents: liveEvents };
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  contactPageData(): Observable<ContactPageData> {
    return this.http.get('api/Contact')
      .map((res, index) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  galleryPageData(): Observable<GalleryPageData> {
    return this.http.get('api/Gallery')
      .map((res, index) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  login(email, password) {
    this.loggedIn = true;
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }

  getPageList(): Array<string> {
    return [ 'Home', 'About', 'Music', 'Live', 'Gallery', 'Teaching', 'Contact'];
  }

  // TODO: Extract urls to a mapping enum?
  updateHomePageData(homePageData: HomePageData): Observable<Response> {
    return this.http.post('api/Home', homePageData);
  }

  updateAboutPageData(aboutPageData: AboutPageData): Observable<Response> {
    return this.http.post('api/About', aboutPageData);
  }

  uploadImage(fullSizeImage: any, croppedImage: any) {
    // TODO: Extract param names into common interface and reference it
    const formData = new FormData();
    formData.append('fullSizeImage', fullSizeImage);
    formData.append('croppedImage', croppedImage);
    return this.http.post('api/UploadImage', formData);
  }


}
