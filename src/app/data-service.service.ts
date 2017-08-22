import { Injectable } from '@angular/core';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { HomePageData } from './common/HomePageData';
import { LiveEvent } from './common/LiveEvent';
import { ContactPageData } from './common/ContactPageData';
import { GalleryImage } from './common/GalleryImage';
import { Http } from '@angular/http';
import { MusicPageData, Song } from './common/MusicPageData';


@Injectable()
export class DataServiceService {


  constructor(private http: Http) {
  }

  getMusicPageData(): MusicPageData {
    const songs = [

      new Song({
                 title : 'Bartok - 14 Bagatelles No 1',
                 author: 'Marina Staneva',
                 url   : 'assets/recordings/Bartok-14-Bagatelles-No-1.mp3',
                 pic   : 'assets/img/square-xl.png'
               }),
      new Song({
                 title : 'Bartok - 14 Bagatelles No 2',
                 author: 'Marina Staneva',
                 url   : 'assets/recordings/Bartok-14-Bagatelles-No-2.mp3',
                 pic   : 'assets/img/square-xl.png'
               }),
      new Song({
                 title : 'Bartok - 14 Bagatelles No 3',
                 author: 'Marina Staneva',
                 url   : 'assets/recordings/Bartok-14-Bagatelles-No-3.mp3',
                 pic   : 'assets/img/square-xl.png'
               }),
      new Song({
                 title : 'Bartok - 14 Bagatelles No 4',
                 author: 'Marina Staneva',
                 url   : 'assets/recordings/Bartok-14-Bagatelles-No-4.mp3',
                 pic   : 'assets/img/square-xl.png'
               })

    ];

    const videos = [
      'https://www.youtube.com/embed/Gq331nJ9sjc',
      'https://www.youtube.com/embed/O-YjblqkLAw'
    ];
    return new MusicPageData({ songs, videos });
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

  getAboutText(): string {
    return `
Marina holds a First Class Masters Degree in Piano Performance from the Guildhall School of Music and Drama under Philip Jenkins.
Previously she completed a Bachelor in Piano Performance at the National Academy of Music in Sofia, Bulgaria under Stella
Dimitrova-Maystorova and Iliya Chernaev. <br/><br/>
Marina performs throughout the UK and Europe both as a soloist and as a collaborative pianist. Her prizes include Airola International Piano
Competition, Italy, Music and Earth International Competition and International Competition for Japanese and Bulgarian Music to name a few.
She has participated in different festivals such as “Liszt Piano Festival” - London, “Dopo il rumore” - Italy, “ppIANISSIMO” - Bulgaria,
“Varna Summer” - Bulgaria. <br/><br/>
Recently she attended The Holland International Music Sessions with a scholarship where she studied with Pavel Gililov. <br/><br/>
She is currently undertaking Advanced Certificate at the Guildhall School of a Music and Drama under Philip Jenkins and Pamela Lidiard.
Her studies are generously supported by the Guildhall Trust.`
  }

  getHomePageData(): HomePageData {
    return new HomePageData('Marina', 'Staneva', 'PIANIST', 'assets/img/1.jpg');
  }

  // Live events month starts from 0 to 11.
  getEvents(): LiveEvent[] {
    return [
      new LiveEvent(new Date(2017, 9, 9, 12, 0, 0),
                    'First Global Granados Marathon',
                    'Live at <a href="https://www.fimte.org">FIMTE</a> ',
                    'https://www..com/events/347228682371868/?__mref=mb',
                    'https://goo.gl/maps/RjZ3Ysc1pRT2'),
      new LiveEvent(new Date(2017, 9, 3, 19, 0, 0),
                    'Masterclass with Julius Drake',
        'Performing with Annie Reilly at the Parliament Chamber Inner Temple, London. Tickets can be bought' +
        '<a href="https://www.templemusic.org/shop/masterclass-with-julius-drake/"> here </a>.',
                    'https://www..com/events/424018774651775?%3Fti=ia&__mref=mb', 'https://goo.gl/maps/FCmoQEZpGDw'),
      new LiveEvent(new Date(2017, 9, 2, 10, 0, 0), 'Masterclass with Read Gainsford', 'Music Hall, Silk Street, London', '',
                    'https://goo.gl/maps/fWG2DGM7HpQ2'),
      new LiveEvent(new Date(2017, 8, 30, 10, 45, 0), 'Piano Recital - Granados, Debussy, Vladigerov', 'Morden College Hall', '',
                    'https://goo.gl/maps/rn2tywygnfz'),
      new LiveEvent(new Date(2017, 2, 24, 19, 0, 0), 'Piano Duo', 'Milton Court Concert Hall, London',
                    'https://www..com/events/1240883842673624/', 'https://goo.gl/maps/RjZ3Ysc1pRT2'),
      new LiveEvent(new Date(2017, 7, 24, 20, 0, 0), 'Piano Recital - Debussy, Rachmaninov and Vladigerov', 'Remonstrantse Kerk', '',
                    'https://goo.gl/maps/WCffsxkejzt'),
      new LiveEvent(new Date(2017, 4, 7, 13, 0, 0), 'Songs of Britain', 'Music Hall, Silk Street, London',
                    'https://www..com/events/1304819516297956/', 'https://goo.gl/maps/fWG2DGM7HpQ2'),
      new LiveEvent(new Date(2017, 5, 20, 10, 0, 0), 'Piano Recital', 'Milton Court Concert Hall, London', '',
                    'https://goo.gl/maps/RjZ3Ysc1pRT2'),
      new LiveEvent(new Date(2017, 2, 6, 13, 0, 0), 'Bagatelles and Musical Momenets for Piano', '1901 Arts Club',
                    'https://www..com/events/1240883842673624/',
                    'https://goo.gl/maps/32Dr1xA6Xh92'),
      new LiveEvent(new Date(2017, 1, 20, 14, 0, 0), 'Masterclass with Svetozar Ivanov', 'Lecture Recital Room, Silk Street, London', '',
                    'https://goo.gl/maps/fWG2DGM7HpQ2'),
      new LiveEvent(new Date(2016, 10, 10, 11, 0, 0), 'Masterclass with Anne Queffelec', 'Music Hall, Silk Street, London', '',
                    'https://goo.gl/maps/fWG2DGM7HpQ2'),
      new LiveEvent(new Date(2016, 10, 17, 14, 0, 0), 'The Glass Sellers\' Beethoven Piano Prize', 'Music Hall, Silk Street, London', '',
                    'https://goo.gl/maps/fWG2DGM7HpQ2'),
      new LiveEvent(new Date(2016, 9, 28, 19, 0, 0), 'Liszt Piano Festival', 'Russian Cultural Centre, London',
                    'https://.com/events/165736817208443/',
                    'https://goo.gl/maps/YKV1hF9crYD2'),
      new LiveEvent(new Date(2016, 5, 30, 11, 0, 0), 'Piano Recital: Mozart, Rachmaninoff, Bartok', 'Milton Court Concert Hall, London', '',
                    'https://goo.gl/maps/RjZ3Ysc1pRT2'),
      new LiveEvent(new Date(2016, 4, 20, 18, 0, 0), 'SONGS AT SIX: FRENCH', 'Milton Court Concert Hall, London',
                    'https://www..com/events/858192900990832/', 'https://goo.gl/maps/RjZ3Ysc1pRT2'),
      new LiveEvent(new Date(2016, 4, 10, 19, 30, 0), 'Mahler Symphony No. 4 for Chamber Ensemble', 'Music Hall Silk Street, London',
                    'https://www..com/events/230447690645821/', 'https://goo.gl/maps/fWG2DGM7HpQ2'),
      new LiveEvent(new Date(2016, 3, 29, 19, 0, 0), 'Piano Duo Project', 'Music Hall Silk Street, London', '',
                    'https://goo.gl/maps/RjZ3Ysc1pRT2'),
      new LiveEvent(new Date(2016, 3, 1, 13, 0, 0), 'Viola and Piano Recital', 'St. John\'s Waterloo, London',
                    'https://www..com/events/991420074226759/', 'https://goo.gl/maps/cwUDczDKTTA2'),
      new LiveEvent(new Date(2017, 11, 3, 13, 0, 0),
        'London Contemporary Music Festival',
    'Ambika P3',
    '',
    'https://goo.gl/maps/4NjNH7yPJRR2'),
      new LiveEvent(new Date(2018, 0, 29, 18, 0, 0),
        'Songs at Six: Italian',
        'Music Hall Silk Street',
        'https://www.facebook.com/events/1989356607969815/',
        'https://goo.gl/maps/fWG2DGM7HpQ2'),
      new LiveEvent(new Date(2018, 1, 4, 17,  30, 0),
        'LSO Platforms: Guildhall Artists',
        'Barbican Hall',
        'https://www.facebook.com/events/143041809696590/?notif_t=plan_user_joined&notif_id=1517505898682612',
        'https://goo.gl/maps/Z65rC1SreyB2'),
      new LiveEvent(new Date(2018, 1, 8, 14),
        'Masterclass & Piano Recital',
        'RGS Worcester',
        '',
        'https://goo.gl/maps/BsoiypdB1Sz'),
      new LiveEvent(new Date(2018, 1, 14, 18),
        'The Song Guild - Britten: The Canticles - Curated by Graham Johnson',
        'Milton Court Concert Hall ',
        '',
        'https://goo.gl/maps/RjZ3Ysc1pRT2'),
      new LiveEvent(new Date(2018, 1, 19, 18),
        'Songs at Six: Commedia dell’Arte',
        'Music Hall Silk Street',
        '',
        'https://goo.gl/maps/fWG2DGM7HpQ2'),
      new LiveEvent(new Date(2018, 3, 21, 11),
        'Voice and Piano Recital with Katherine McIndoe',
        'Canterbury',
        '',
        'https://goo.gl/maps/4zCiyNA6uCU2'),
      new LiveEvent(new Date(2018, 4, 1, 11),
        'Piano Recital',
        'Faversham',
        '',
        'https://goo.gl/maps/zhkcQQxa3at'),
      new LiveEvent(new Date(2018, 4, 9, 13),
        'The Prince Consort - Curated by Alisdair Hogarth',
        'Wigmore Hall',
        '',
        'https://goo.gl/maps/srnmKcrbsJQ2'),
      new LiveEvent(new Date(2018, 4, 25, 18),
        'Songs at Six: Russian',
        'TBC',
        '',
        '')
  ];
  }

  getContactPageData(): ContactPageData {
    return new ContactPageData("contact@marinastaneva.com", "+44 (0)7399 443763", "London, United Kingdom", "https://twitter.com/StanevaM", "https://www.youtube.com/channel/UCgMM6D_YCuTpsw9fFya691Q");
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
      new GalleryImage('assets/img/main.jpg', 'assets/img/thumbs/main.jpg') ];
  }


}
