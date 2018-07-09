import {merge as observableMerge, Observable} from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {MenuItemComponent} from './menu-item/menu-item.component';
import {HttpClient} from '@angular/common/http';
import {
  AboutPageData,
  ContactPageData,
  GalleryPageData,
  HomePageData,
  LiveEvent, LivePageData,
  MusicPageData,
  PageType
} from './types';
import {FirebaseService} from './services/firebase.service';

export type PageData = HomePageData | AboutPageData | GalleryPageData | LivePageData | MusicPageData | ContactPageData;

export interface IEventsResponse {
  liveEvents: LiveEvent[];
}

@Injectable()
export class DataServiceService {
  private loggedIn = true;

  constructor(private http: HttpClient, private firebaseService: FirebaseService) {
  }

  getMenuItems(): MenuItemComponent[] {
    return [new MenuItemComponent('Home', '/'),
      new MenuItemComponent('About', '/About'),
      new MenuItemComponent('Music', '/Music'),
      new MenuItemComponent('Live', '/Live'),
      new MenuItemComponent('Gallery', '/Gallery'),
      // new MenuItemComponent('Teaching', '/Teaching'), // TODO: Nasco add teaching when it's ready
      new MenuItemComponent('Contact', '/Contact')
    ];
  }

  aboutText(): Observable<AboutPageData> {
    return Observable.fromPromise(this.firebaseService.getPageData(PageType.ABOUT) as Promise<AboutPageData>);
  }

  homePageData(): Observable<HomePageData> {
    return Observable.fromPromise(this.firebaseService.getPageData(PageType.HOME) as Promise<HomePageData>);
  }

  musicPageData(): Observable<MusicPageData> {
    return Observable.fromPromise(this.firebaseService.getPageData(PageType.MUSIC) as Promise<MusicPageData>);
  }

  getPageData(): Observable<PageData> {
    const mergedObservable = observableMerge(this.homePageData(), this.aboutText(), this.galleryPageData());
    return mergedObservable;
  }

  // Live events month starts from 0 to 11.
  liveEvents(): Observable<IEventsResponse> {
    return Observable.fromPromise(this.firebaseService.getPageData(PageType.LIVE) as Promise<IEventsResponse>)
      .pipe(map((response: IEventsResponse) => {
        console.log(response.liveEvents);
        let entries = Object.entries(response.liveEvents);
        console.log(entries);
        const liveEvents = entries.map((entry: any) => {
          const event = entry[1];
          return new LiveEvent(new Date(event.date),
            event.eventName,
            event.eventLocation,
            event.facebookLink,
            event.googleMapsLink);
        });
        return {liveEvents: liveEvents};
      }));
  }

  contactPageData(): Observable<ContactPageData> {
    return Observable.fromPromise(this.firebaseService.getPageData(PageType.CONTACT) as Promise<ContactPageData>);
  }

  galleryPageData(): Observable<GalleryPageData> {
    return Observable.fromPromise(this.firebaseService.getPageData(PageType.GALLERY) as Promise<GalleryPageData>);
  }

  login(email, password) {
    this.loggedIn = true;
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }

  getPageList(): Array<string> {
    return ['Home', 'About', 'Music', 'Live', 'Gallery', 'Teaching', 'Contact'];
  }

  // TODO: Extract urls to a mapping enum?
  updateHomePageData(homePageData: HomePageData): Promise<undefined | Error> {
    return this.firebaseService.setPageData(PageType.HOME, homePageData);
  }

  updateAboutPageData(aboutPageData: AboutPageData): Promise<undefined | Error> {
    return this.firebaseService.setPageData(PageType.ABOUT, aboutPageData);
  }

  addNewEvent(liveEvent: LiveEvent): Promise<any> {
    return this.firebaseService.addNewLiveEvent(liveEvent);
  }


  uploadImage(fullSizeImage: any, croppedImage: any) {
    // TODO: Extract param names into common interface and reference it
    const formData = new FormData();
    formData.append('fullSizeImage', fullSizeImage);
    formData.append('croppedImage', croppedImage);
    return this.http.post('api/UploadImage', formData);
  }
}
