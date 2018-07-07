import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../data-service.service';
import {GalleryPageData} from '../../../common/page-models';

@Component({
  selector: 'app-gallery-page-view',
  templateUrl: './gallery-page-view.component.html',
  styleUrls: ['./gallery-page-view.component.css']
})
export class GalleryPageViewComponent implements OnInit {
  public images = [];
  constructor(public readonly dataService: DataServiceService) { }

  ngOnInit() {
    this.dataService.galleryPageData().subscribe((data: GalleryPageData) => {
      this.images = data.galleryImages;
    })
  }

  private deleteButtonClick(e) {
    console.log('Clicked image');
    console.log(e)
  }
}
