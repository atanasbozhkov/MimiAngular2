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
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/merge';

export type PageData = HomePageData | AboutPageData;

@Injectable()
export class DataServiceService {
  private loggeedIn = true;

  constructor(private http: Http) {
  }

  getMusicPageData(): Observable<MusicPageData> {
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

  getAboutText(): Observable<AboutPageData> {

    return this.http.get('api/About')
      .map((res, index) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getHomePageData(): Observable<HomePageData> {
    return this.http.get('api/Home')
      .map((res, index) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPageData(): Observable<PageData> {
    let mergedObservable = Observable.merge(this.getHomePageData(), this.getAboutText());
    return mergedObservable;
  }

  // TODO: Extract urls to a mapping enum?
  updateHomePageData(homePageData: HomePageData): Observable<Response> {
    return this.http.post('api/Home', homePageData);
  }

  updateAboutPageData(aboutPageData: AboutPageData): Observable<Response> {
    return this.http.post('api/About', aboutPageData);
  }

  // Live events month starts from 0 to 11.
  getEvents(): Observable<{ liveEvents: LiveEvent[] }> {
    return this.http.get('api/Live')
      .map((res, index) => {
        console.log('heelo from ds');
        const liveEvents = res.json().liveEvents.map(event => {
          return new LiveEvent(new Date(event.date),
            event.eventName,
            event.eventLocation,
            event.facebookLink,
            event.googleMapsLink);
        });
        console.log({ liveEvents: liveEvents })
        return { liveEvents: liveEvents };
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    // return [
    //   new LiveEvent(new Date(2017, 9, 9, 12, 0, 0),
    //     'First Global Granados Marathon',
    //     'Live at <a href="https://www.fimte.org">FIMTE</a> ',
    //     'https://www.facebook.com/events/347228682371868/?__mref=mb',
    //     'https://goo.gl/maps/RjZ3Ysc1pRT2'),
    //   new LiveEvent(new Date(2017, 9, 3, 19, 0, 0),
    //     'Masterclass with Julius Drake',
    //     'Performing with Annie Reilly at the Parliament Chamber Inner Temple, London. Tickets can be bought' +
    //     '<a href="https://www.templemusic.org/shop/masterclass-with-julius-drake/"> here </a>.',
    //     'https://www.facebook.com/events/424018774651775?%3Fti=ia&__mref=mb', 'https://goo.gl/maps/FCmoQEZpGDw'),
    //   new LiveEvent(new Date(2017, 9, 2, 10, 0, 0), 'Masterclass with Read Gainsford', 'Music Hall, Silk Street, London', '',
    //     'https://goo.gl/maps/fWG2DGM7HpQ2'),
    //   new LiveEvent(new Date(2017, 8, 30, 10, 45, 0), 'Piano Recital - Granados, Debussy, Vladigerov', 'Morden College Hall', '',
    //     'https://goo.gl/maps/rn2tywygnfz'),
    //   new LiveEvent(new Date(2017, 2, 24, 19, 0, 0), 'Piano Duo', 'Milton Court Concert Hall, London',
    //     'https://www.facebook.com/events/1240883842673624/', 'https://goo.gl/maps/RjZ3Ysc1pRT2'),
    //   new LiveEvent(new Date(2017, 7, 24, 20, 0, 0), 'Piano Recital - Debussy, Rachmaninov and Vladigerov', 'Remonstrantse Kerk', '',
    //     'https://goo.gl/maps/WCffsxkejzt'),
    //   new LiveEvent(new Date(2017, 4, 7, 13, 0, 0), 'Songs of Britain', 'Music Hall, Silk Street, London',
    //     'https://www.facebook.com/events/1304819516297956/', 'https://goo.gl/maps/fWG2DGM7HpQ2'),
    //   new LiveEvent(new Date(2017, 5, 20, 10, 0, 0), 'Piano Recital', 'Milton Court Concert Hall, London', '',
    //     'https://goo.gl/maps/RjZ3Ysc1pRT2'),
    //   new LiveEvent(new Date(2017, 2, 6, 13, 0, 0), 'Bagatelles and Musical Momenets for Piano', '1901 Arts Club',
    //     'https://www.facebook.com/events/1240883842673624/',
    //     'https://goo.gl/maps/32Dr1xA6Xh92'),
    //   new LiveEvent(new Date(2017, 1, 20, 14, 0, 0), 'Masterclass with Svetozar Ivanov', 'Lecture Recital Room, Silk Street, London', '',
    //     'https://goo.gl/maps/fWG2DGM7HpQ2'),
    //   new LiveEvent(new Date(2016, 10, 10, 11, 0, 0), 'Masterclass with Anne Queffelec', 'Music Hall, Silk Street, London', '',
    //     'https://goo.gl/maps/fWG2DGM7HpQ2'),
    //   new LiveEvent(new Date(2016, 10, 17, 14, 0, 0), 'The Glass Sellers\' Beethoven Piano Prize', 'Music Hall, Silk Street, London', '',
    //     'https://goo.gl/maps/fWG2DGM7HpQ2'),
    //   new LiveEvent(new Date(2016, 9, 28, 19, 0, 0), 'Liszt Piano Festival', 'Russian Cultural Centre, London',
    //     'https://facebook.com/events/165736817208443/',
    //     'https://goo.gl/maps/YKV1hF9crYD2'),
    //   new LiveEvent(new Date(2016, 5, 30, 11, 0, 0), 'Piano Recital: Mozart, Rachmaninoff, Bartok', 'Milton Court Concert Hall, London',
    // '',
    //     'https://goo.gl/maps/RjZ3Ysc1pRT2'),
    //   new LiveEvent(new Date(2016, 4, 20, 18, 0, 0), 'SONGS AT SIX: FRENCH', 'Milton Court Concert Hall, London',
    //     'https://www.facebook.com/events/858192900990832/', 'https://goo.gl/maps/RjZ3Ysc1pRT2'),
    //   new LiveEvent(new Date(2016, 4, 10, 19, 30, 0), 'Mahler Symphony No. 4 for Chamber Ensemble', 'Music Hall Silk Street, London',
    //     'https://www.facebook.com/events/230447690645821/', 'https://goo.gl/maps/fWG2DGM7HpQ2'),
    //   new LiveEvent(new Date(2016, 3, 29, 19, 0, 0), 'Piano Duo Project', 'Music Hall Silk Street, London', '',
    //     'https://goo.gl/maps/RjZ3Ysc1pRT2'),
    //   new LiveEvent(new Date(2016, 3, 1, 13, 0, 0), 'Viola and Piano Recital', 'St. John\'s Waterloo, London',
    //     'https://www.facebook.com/events/991420074226759/', 'https://goo.gl/maps/cwUDczDKTTA2') ];
  }

  getContactPageData(): Observable<ContactPageData> {
    // return new ContactPageData('contact@marinastaneva.com',
    //   '+44 (0)7399 443763',
    //   'London, United Kingdom',
    //   'https://twitter.com/StanevaM',
    //   'https://www.youtube.com/channel/UCgMM6D_YCuTpsw9fFya691Q');
    return this.http.get('api/Contact')
      .map((res, index) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getGalleryImages(): Observable<GalleryPageData> {
    return this.http.get('api/Gallery')
      .map((res, index) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    // return [
    //   new GalleryImage('assets/img/5.jpg', 'assets/img/thumbs/DSC_9502.jpg'),
    //   new GalleryImage('assets/img/6.jpg', 'assets/img/thumbs/DSC_9559.jpg'),
    //   new GalleryImage('assets/img/Liszt Piano Festival.jpg', 'assets/img/thumbs/LisztPianoFestival.jpg'),
    //   new GalleryImage('assets/img/1.jpg', 'assets/img/thumbs/1.jpg'),
    //   new GalleryImage('assets/img/2.jpg', 'assets/img/thumbs/2.jpg'),
    //   new GalleryImage('assets/img/4.jpg', 'assets/img/thumbs/4.jpg'),
    //   new GalleryImage('assets/img/about.jpg', 'assets/img/thumbs/about.jpg'),
    //   new GalleryImage('assets/img/DSC_4217.jpg', 'assets/img/thumbs/DSC_4217.jpg'),
    //   new GalleryImage('assets/img/main.jpg', 'assets/img/thumbs/main.jpg') ];

  }

  login(email, password) {
    this.loggeedIn = true;
  }

  isAuthenticated(): boolean {
    return this.loggeedIn;
  }

  getPageList(): Array<string> {
    return [ 'Home', 'About', 'Music', 'Live', 'Gallery', 'Teaching', 'Contact'];
  }

}
