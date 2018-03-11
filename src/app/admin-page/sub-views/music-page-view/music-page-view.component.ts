import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-music-page-view',
  templateUrl: './music-page-view.component.html',
  styleUrls: ['./music-page-view.component.css']
})
export class MusicPageViewComponent implements OnInit {
  // Things this component should be able to do:
  /**
   * Get a list of available song urls
   * Sort list of songs? (confirm with marina)
   * Upload delete songs -> should update the available list immediately
   * ----
   * Get a list of set youtube videos
   * Edit youtube list ordering
   * Add / Remove videos from current list
   * Video title/desc (confirm with Marina)
   */
  constructor() { }

  ngOnInit() {
  }

  private getMusicPageData() {
    console.log('getting music page data');
  }

  private addSong(song: any) {
  }

  private removeSong(songId: any) {
  }

  private addVideoLink(videoLink: any) {
  }

  private getVideos() {
    console.log('getting videos');
  }
}
