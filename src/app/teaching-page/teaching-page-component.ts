import {Component, OnInit} from '@angular/core';
import {DataServiceService} from '../data-service.service';

@Component({
  selector: 'app-teaching-about-page',
  templateUrl: './teaching-page.component.html',
  styleUrls: ['./teaching-page.component.css']
})
export class TeachingPageComponent implements OnInit {
  aboutText: string;
  moto: string;

  constructor(private dataService: DataServiceService) {
    this.aboutText = 'teaching text';
    this.moto = 'TEACHING';
  }

  ngOnInit() {
  }

}
