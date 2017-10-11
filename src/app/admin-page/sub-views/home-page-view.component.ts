import { Component, Input } from '@angular/core';
import { HomePageData } from '../../common/HomePageData';

@Component({
  selector: 'app-home-page-view',
  templateUrl: './home-page-view.component.html',
  styleUrls: [ './home-page-view.component.css' ]
})
export class HomePageViewComponent {
  @Input('homePageData') homePageData: HomePageData;

  saveHomePageData() {
    console.log(this.homePageData);
  }
}
