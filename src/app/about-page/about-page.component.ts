import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: [ './about-page.component.css' ]
})
export class AboutPageComponent implements OnInit {
  aboutText: string;
  moto: string;
  photoUrl: string;

  constructor(private dataService: DataServiceService) {
    dataService.aboutText().subscribe((data) => {
      this.aboutText = data.aboutText;
      this.photoUrl = data.photoUrl;
    });
    this.moto = 'ABOUT';
  }

  ngOnInit() {
  }

}
