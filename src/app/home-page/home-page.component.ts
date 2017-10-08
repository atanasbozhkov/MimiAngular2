import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { HomePageData } from '../common/HomePageData';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: [ './home-page.component.css' ]
})
export class HomePageComponent implements OnInit {
  firstName: string;
  lastName: string;
  moto: string;
  photoUrl: string;

  constructor(private dataService: DataServiceService) {
    let obs: Observable<HomePageData> = dataService.getHomePageData();
    obs.subscribe((data) => {
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.moto = data.moto;
      this.photoUrl = data.photoUrl;
    });
  }

  ngOnInit() {
  }

}
