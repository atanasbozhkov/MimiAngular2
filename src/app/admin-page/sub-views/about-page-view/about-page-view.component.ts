import { Component, Input } from '@angular/core';
import { HomePageData } from '../../../../../types';

@Component({
  selector: 'app-home-page-view',
  templateUrl: './about-page-view.component.html',
  styleUrls: [ './about-page-view.component.css' ]
})
export class AboutPageViewComponent {
  @Input('homePageData') homePageData: HomePageData;

  saveHomePageData() {
    console.log(this.homePageData);
  }
}
