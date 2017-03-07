import {Injectable} from '@angular/core';
import {MenuItemComponent} from "./menu-item/menu-item.component";
import {HomePageData} from "./common/HomePageData";
import {LiveEvent} from "./common/LiveEvent";
import {ContactPageData} from "./common/ContactPageData";
import {GalleryImage} from "./common/GalleryImage";

@Injectable()
export class DataServiceService {


  constructor() {
  }

  getMenuItems(): MenuItemComponent[] {
    return [new MenuItemComponent('Home', '/', true),
      new MenuItemComponent('About', '/About', false),
      new MenuItemComponent('Music', '/Music', false),
      new MenuItemComponent('Live', '/Live', false),
      new MenuItemComponent('Gallery', '/Gallery', false),
      // new MenuItemComponent('Teaching', '/Teaching', false),
      new MenuItemComponent('Contact', '/Contact', false)
    ]
  }

  getAboutText(): string {
    return 'Marina completed a Bachelor in Piano Performance at the National Academy of Music in Sofia, Bulgaria with a first class under Stella Dimitrova-Maystorova and Iliya Chernaev. Alongside her studies, she has been giving performances in the UK, Italy, Bulgaria, Turkey, Greece and Ukraine, both as a soloist and as a collaborative pianist. Her prizes include Airola International Piano Competition, Italy and International Competition for Japanese and Bulgarian Music to name a few. She has participated in different festivals such as <i>“Liszt Piano Festival”</i> - London, <i>“Dopo il rumore”</i> - Italy, <i>“ppIANISSIMO, Bulgaria, Varna Summer”</i> - Bulgaria.<br> <br> She is currently undertaking Guildhall Artist Masters in Piano Performance at the Guildhall School of Music and Drama under Philip Jenkins. Her studies are generously supported by the Guildhall Trust.';
  }

  getHomePageData(): HomePageData {
    var homePageData: HomePageData = new HomePageData('Marina', 'Staneva', 'PIANIST', 'assets/img/1.jpg');
    return homePageData;
  }

  getEvents(): LiveEvent[] {
    return [new LiveEvent(Date.now() + 36000, "Bagatelles and Musical Momenets for Piano", "1901 Arts club", "FB", "google"),
      new LiveEvent(Date.now() - 1500, "Test2", "Location2", "FB", "GOOGLE")];
  }

  getContactPageData(): ContactPageData {
    return new ContactPageData("contact@marinastaneva.com", "+44 (0)7399 443763", "London, United Kingdom");
  }

  getGalleryImages(): GalleryImage[] {
    return [new GalleryImage('assets/img/1.jpg', 'assets/img/thumbs/1.jpg'),
      new GalleryImage('assets/img/2.jpg', 'assets/img/thumbs/2.jpg'),
      new GalleryImage('assets/img/4.jpg', 'assets/img/thumbs/4.jpg'),
      new GalleryImage('assets/img/about.jpg', 'assets/img/thumbs/about.jpg'),
      new GalleryImage('assets/img/DSC_4217.jpg', 'assets/img/thumbs/DSC_4217.jpg'),
      new GalleryImage('assets/img/main.jpg', 'assets/img/thumbs/main.jpg')];
  }


}
