import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { MusicPageData } from '../common/MusicPageData';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare let APlayer: any;

declare function require(name: string);

@Component({ selector   : 'app-music-page',
             templateUrl: './music-page.component.html',
             styleUrls  : [ './music-page.component.css' ]
})


export class MusicPageComponent implements OnDestroy, AfterViewInit {
  ap: any;
  musicPageData: MusicPageData;
  videos: Array<SafeResourceUrl>;

  constructor(dataService: DataServiceService, public sanitizer: DomSanitizer) {
    this.musicPageData = dataService.getMusicPageData();
    this.videos = this.getVideoUrls();
  }

  private getVideoUrls(): Array<SafeResourceUrl> {
    return this.musicPageData.videos.map(videoUrl => this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl));
  }

  ngOnDestroy() {
    this.ap.pause();
  }

  ngAfterViewInit() {
    let APlayer = require('aplayer');
    const playerConfig = {
      element : document.getElementById('player'),
      narrow  : false,
      autoplay: false,
      showlrc : false,
      theme   : '#27D3B4',
      music   : this.musicPageData.songs
    };
    this.ap = new APlayer(playerConfig);
  }

}
