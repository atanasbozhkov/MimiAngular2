import {merge as observableMerge,  Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MenuItemComponent } from './menu-item/menu-item.component';
import {HttpClient} from '@angular/common/http';
import {
  AboutPageData,
  ContactPageData,
  GalleryPageData,
  HomePageData,
  LiveEvent,
  MusicPageData
} from './types';

export type PageData = HomePageData | AboutPageData | GalleryPageData;

type IEventsResponse = { liveEvents: LiveEvent[] };

@Injectable()
export class DataServiceService {
  private loggedIn = true;

  constructor(private http: HttpClient) {
  }

  musicPageData(): Observable<MusicPageData> {
    return this.http.get<MusicPageData>('api/Music');
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
    return this.http.get<AboutPageData>('api/About');
  }

  homePageData(): Observable<HomePageData> {
    return this.http.get<HomePageData>('api/Home');
  }

  getPageData(): Observable<PageData> {
    let mergedObservable = observableMerge(this.homePageData(), this.aboutText(), this.galleryPageData());
    return mergedObservable;
  }

  // Live events month starts from 0 to 11.
  liveEvents(): Observable<IEventsResponse> {
    return this.http.get<IEventsResponse>('api/Live').pipe(map((response: IEventsResponse) => {
      const liveEvents = response.liveEvents.map(event => {
        return new LiveEvent(new Date(event.date),
          event.eventName,
          event.eventLocation,
          event.facebookLink,
          event.googleMapsLink);
      });
      return { liveEvents: liveEvents };
    }))
  }

  contactPageData(): Observable<ContactPageData> {
    return this.http.get<ContactPageData>('api/Contact');
  }

  galleryPageData(): Observable<GalleryPageData> {
    return this.http.get<GalleryPageData>('api/Gallery');
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
  updateHomePageData(homePageData: HomePageData): Observable<HomePageData> {
    return this.http.post<HomePageData>('api/Home', homePageData);
  }

  updateAboutPageData(aboutPageData: AboutPageData): Observable<AboutPageData> {
    return this.http.post<AboutPageData>('api/About', aboutPageData);
  }

  uploadImage(fullSizeImage: any, croppedImage: any) {
    // TODO: Extract param names into common interface and reference it
    const formData = new FormData();
    formData.append('fullSizeImage', fullSizeImage);
    formData.append('croppedImage', croppedImage);
    return this.http.post('api/UploadImage', formData);
  }
}
