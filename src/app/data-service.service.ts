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

  // Live events month starts from 0 to 11.
  getEvents(): LiveEvent[] {
    return [new LiveEvent(new Date(2017, 2, 24, 19, 0, 0), "Piano Duo", "Milton Court Concert Hall, London", "https://www.facebook.com/events/1240883842673624/", "https://goo.gl/maps/RjZ3Ysc1pRT2"),
      new LiveEvent(new Date(2017, 4, 30, 13, 0, 0), "Voice and Piano Duo Recital - alongside Karen Schriesheim", "St. Stephen Walbrook, London", "", "https://www.google.co.uk/maps/place/St+Stephen+Walbrook/@51.5126385,-0.0920613,17z/data=!3m1!4b1!4m5!3m4!1s0x48760354f4032875:0xc1fad2aa0247618c!8m2!3d51.5126352!4d-0.0898726"),
      new LiveEvent(new Date(2017, 4, 7, 13, 0, 0), "Songs of Britain", "Music Hall, Silk Street, London", "https://www.facebook.com/events/1304819516297956/", "https://goo.gl/maps/fWG2DGM7HpQ2"),
      new LiveEvent(new Date(2017, 5, 20, 10, 0, 0), "Piano Recital", "Milton Court Concert Hall, London", "", "https://goo.gl/maps/RjZ3Ysc1pRT2"),
      new LiveEvent(new Date(2017, 2, 6, 13, 0, 0), "Bagatelles and Musical Momenets for Piano", "1901 Arts Club", "https://www.facebook.com/events/1240883842673624/", "https://www.google.co.uk/maps/place/%201901+Arts+Club/@51.5042148,-0.1130541,17z/data=!3m1!4b1!4m5!3m4!%201s0x487604ba07ca9bb5:0x81557c8a691516a6!8m2!3d51.5042115!%204d-0.1108654"),
      new LiveEvent(new Date(2017, 1, 20, 14, 0, 0), "Masterclass with Svetozar Ivanov", "Lecture Recital Room, Silk Street, London", "", "https://goo.gl/maps/fWG2DGM7HpQ2"),
      new LiveEvent(new Date(2016, 10, 10, 11, 0, 0), "Masterclass with Anne Queffelec", "Music Hall, Silk Street, London", "", "https://goo.gl/maps/fWG2DGM7HpQ2"),
      new LiveEvent(new Date(2016, 10, 17, 14, 0, 0), "The Glass Sellers' Beethoven Piano Prize", "Music Hall, Silk Street, London", "", "https://goo.gl/maps/fWG2DGM7HpQ2"),
      new LiveEvent(new Date(2016, 9, 28, 19, 0, 0), "Liszt Piano Festival", "Russian Cultural Centre, London", "https://facebook.com/events/165736817208443/", "https://www.google.co.uk/maps/place/37+Kensington+High+St,+Kensington,+London+W8+5ED/@51.5021476,-0.1912265,17z/data=!3m1!4b1!4m5!3m4!1s0x48760ff7c983eaa7:0x98a74f1850d4cabc!8m2!3d51.5021443!4d-0.1890378"),
      new LiveEvent(new Date(2016, 5, 30, 11, 0, 0), "Piano Recital: Mozart, Rachmaninoff, Bartok", "Milton Court Concert Hall, London", "", "https://goo.gl/maps/RjZ3Ysc1pRT2"),
      new LiveEvent(new Date(2016, 4, 20, 18, 0, 0), "SONGS AT SIX: FRENCH", "Milton Court Concert Hall, London", "https://www.facebook.com/events/858192900990832/", "https://goo.gl/maps/RjZ3Ysc1pRT2"),
      new LiveEvent(new Date(2016, 4, 10, 19, 30, 0), "Mahler Symphony No. 4 for Chamber Ensemble", "Music Hall Silk Street, London", "https://www.facebook.com/events/230447690645821/", "https://goo.gl/maps/fWG2DGM7HpQ2"),
      new LiveEvent(new Date(2016, 3, 29, 19, 0, 0), "Piano Duo Project", "Music Hall Silk Street, London", "", "https://goo.gl/maps/RjZ3Ysc1pRT2"),
      new LiveEvent(new Date(2016, 3, 1, 13, 0, 0), "Viola and Piano Recital", "St. John's Waterloo, London", "https://www.facebook.com/events/991420074226759/", "https://goo.gl/maps/cwUDczDKTTA2")];
  }

  getContactPageData(): ContactPageData {
    return new ContactPageData("contact@marinastaneva.com", "+44 (0)7399 443763", "London, United Kingdom");
  }

  getGalleryImages(): GalleryImage[] {
    return [
      new GalleryImage('assets/img/5.jpg', 'assets/img/thumbs/DSC_9502.jpg'),
      new GalleryImage('assets/img/6.jpg', 'assets/img/thumbs/DSC_9559.jpg'),
      new GalleryImage('assets/img/Liszt Piano Festival.jpg', 'assets/img/thumbs/LisztPianoFestival.jpg'),
      new GalleryImage('assets/img/1.jpg', 'assets/img/thumbs/1.jpg'),
      new GalleryImage('assets/img/2.jpg', 'assets/img/thumbs/2.jpg'),
      new GalleryImage('assets/img/4.jpg', 'assets/img/thumbs/4.jpg'),
      new GalleryImage('assets/img/about.jpg', 'assets/img/thumbs/about.jpg'),
      new GalleryImage('assets/img/DSC_4217.jpg', 'assets/img/thumbs/DSC_4217.jpg'),
      new GalleryImage('assets/img/main.jpg', 'assets/img/thumbs/main.jpg')];
  }


}
