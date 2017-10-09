import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: [ './contact-page.component.css' ]
})
export class ContactPageComponent {

  email: string;
  phone: string;
  location: string;
  twitter: string;
  youtube: string;

  constructor(dataService: DataServiceService) {
    const observable = dataService.getContactPageData();
    observable.subscribe((data) => {
      const contactPageData = data;

      this.email = contactPageData.email;
      this.phone = contactPageData.phone;
      this.location = contactPageData.location;
      this.twitter = contactPageData.twitter;
      this.youtube = contactPageData.youtube;
    });

  }
}
