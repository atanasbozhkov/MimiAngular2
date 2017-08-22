import {Component, OnInit} from '@angular/core';
import {DataServiceService} from '../data-service.service';
import {HomePageData} from '../common/HomePageData';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  firstName: string;
  lastName: string;
  moto: string;
  photoUrl: string;

  constructor(private dataService: DataServiceService) {
    let homePageData: HomePageData = dataService.getHomePageData();
    this.firstName = homePageData.firstName;
    this.lastName = homePageData.lastName;
    this.moto = homePageData.moto;
    this.photoUrl = homePageData.photoUrl;
  }

  ngOnInit() {
  }

}
