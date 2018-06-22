import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { MusicPageData } from '.././types';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare let APlayer: any;

declare function require(name: string);

@Component({
  selector: 'app-music-page',
  templateUrl: './music-page.component.html',
  styleUrls: [ './music-page.component.css' ]
})

export class MusicPageComponent implements OnDestroy, AfterViewInit {
  ap: any;
  musicPageData: MusicPageData;
  videos: Array<SafeResourceUrl>;

  constructor(dataService: DataServiceService, public sanitizer: DomSanitizer) {
    const observable = dataService.musicPageData();
    observable.subscribe((data) => {
      this.musicPageData = data;
      this.videos = this.getVideoUrls();
      this.initPlayer();
    })
  }

  private getVideoUrls(): Array<SafeResourceUrl> {
    if (this.musicPageData.videos === undefined) {
      console.warn('Videos came back empty.');
      this.musicPageData.videos = [];
    }
    return this.musicPageData.videos.map(videoUrl => this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl));
  }

  ngOnDestroy() {
    this.ap.pause();
  }

  ngAfterViewInit() {
  }

  initPlayer() {
    let APlayer = require('aplayer'); // tslint:disable-line
    const playerConfig = {
      element: document.getElementById('player'),
      narrow: false,
      autoplay: false,
      showlrc: false,
      theme: '#27D3B4',
      music: this.musicPageData.songs
    };
    this.ap = new APlayer(playerConfig);
  }

}
