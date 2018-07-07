
import {throwError as observableThrowError} from 'rxjs';

import {catchError} from 'rxjs/operators';
import {Component, OnInit, ViewChild} from '@angular/core';
import { CropperSettings, ImageCropperComponent } from 'ngx-img-cropper';
import {DataServiceService} from '../../../data-service.service';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-asset-management-view',
  templateUrl: './asset-management-view.component.html',
  styleUrls: ['./asset-management-view.component.css']
})
export class AssetManagementViewComponent {
  croppedImage: any;

  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  cropperSettings: CropperSettings;
  image: any;

  constructor(public readonly dataService: DataServiceService) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    const THUMBNAIL_SIZE = 257;
    this.cropperSettings.croppedWidth = THUMBNAIL_SIZE;
    this.cropperSettings.croppedHeight = THUMBNAIL_SIZE;

    this.croppedImage = {};
    this.image = new Image(); // TODO: New image type?
    console.log('Initialising asset page subview')

  }

  fileChangeListener($event) {
    let file: File = $event.target.files[0];
    let myReader: FileReader = new FileReader();
    myReader.onloadend = (loadEvent: any) => {
      this.image.src = loadEvent.target.result;
      this.cropper.setImage(this.image);
    };

    myReader.readAsDataURL(file);
  }

  public onUploadClick(event: Event): void {
    this.dataService.uploadImage(this.image.src, this.croppedImage.image).pipe(
      catchError((err, caught) => {
        return observableThrowError(err);
      })).subscribe(val => {
      if (val !== undefined) {
        console.log('HELLO');
      }
      console.log('HELLO2')
    });
  }

}
