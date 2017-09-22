import { Component, OnInit } from '@angular/core';
// let $: any = require('jquery');
// let Lighbox: any = require('lightbox2');
import { GalleryImage } from '../common/GalleryImage';
import { DataServiceService } from '../data-service.service';

declare function require(name: string);

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: [ './gallery-page.component.css' ]
})
export class GalleryPageComponent implements OnInit {

  moto: string;
  images: GalleryImage[];

  constructor(dataServices: DataServiceService) {
    this.moto = 'PHOTOS';
    this.images = dataServices.getGalleryImages();

  }

  ngOnInit() {
  }

}
