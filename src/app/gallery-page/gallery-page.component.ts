import { Component, OnInit } from '@angular/core';
declare var Lighbox: any;
import '../../assets/lightbox/js/lightbox-plus-jquery.js'
import {GalleryImage} from "../common/GalleryImage";
import {DataServiceService} from "../data-service.service";

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.css']
})
export class GalleryPageComponent implements OnInit {

  moto: string;
  images: GalleryImage[];

  constructor(dataServices: DataServiceService) {
    this.moto = 'GALLERY';
    this.images = dataServices.getGalleryImages();

  }

  ngOnInit() {
  }

}
