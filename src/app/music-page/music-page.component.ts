import {Component, OnInit} from '@angular/core';
declare let APlayer: any;
declare function require(name: string);
@Component({
  selector: 'app-music-page',
  templateUrl: './music-page.component.html',
  styleUrls: ['./music-page.component.css']
})


export class MusicPageComponent {
  initialised: boolean = false;

  ngOnInit() {

  }

  ngOnDestroy() {
    console.warn('Destroying view');
  }

  ngAfterViewInit() {
    if (this.initialised == false) {
      console.log('Initialised was false ' + this.initialised);
      this.initialised = true;
      console.log('Setting initialised to true: ' + this.initialised);
      let APlayer = require('aplayer');
      let ap = new APlayer({
        element: document.getElementById('player1'),
        narrow: false,
        autoplay: false,
        showlrc: false,
        theme: '#27D3B4',
        music: [
          {
            title: 'Bartok - 14 Bagatelles No 1',
            author: 'Marina Staneva',
            url: 'assets/recordings/Bartok-14-Bagatelles-No-1.mp3',
            pic: 'assets/img/square-xl.png'
          },
          {
            title: 'Bartok - 14 Bagatelles No 2',
            author: 'Marina Staneva',
            url: 'assets/recordings/Bartok-14-Bagatelles-No-2.mp3',
            pic: 'assets/img/square-xl.png'
          },
          {
            title: 'Bartok - 14 Bagatelles No 3',
            author: 'Marina Staneva',
            url: 'assets/recordings/Bartok-14-Bagatelles-No-3.mp3',
            pic: 'assets/img/square-xl.png'
          },
          {
            title: 'Bartok - 14 Bagatelles No 4',
            author: 'Marina Staneva',
            url: 'assets/recordings/Bartok-14-Bagatelles-No-4.mp3',
            pic: 'assets/img/square-xl.png'
          }
        ]
      });
      ap.init();
    }
  }

}
