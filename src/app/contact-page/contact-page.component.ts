import { Component, OnInit } from '@angular/core';
import {DataServiceService} from "../data-service.service";

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {

  email: string;
  phone: string;
  location: string;


  constructor(dataService: DataServiceService) {
    var contactPageData = dataService.getContactPageData();
    this.email = contactPageData.email;
    this.phone = contactPageData.phone;
    this.location = contactPageData.location;
  }

  ngOnInit() {
  }

}
