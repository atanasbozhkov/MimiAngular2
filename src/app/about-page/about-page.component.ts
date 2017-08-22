import {Component, OnInit} from '@angular/core';
import {DataServiceService} from '../data-service.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {
  aboutText: string;
  moto: string;

  constructor(private dataService: DataServiceService) {
    this.aboutText = dataService.getAboutText();
    this.moto = 'ABOUT';
  }

  ngOnInit() {
  }

}
