
import {throwError as observableThrowError} from 'rxjs';

import {catchError} from 'rxjs/operators';
import {Component, Input, ViewChild} from '@angular/core';
import { HomePageData } from '../../.././types';
import {DataServiceService} from '../../../data-service.service';
import {SwalComponent} from '@toverux/ngx-sweetalert2';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-home-page-view',
  templateUrl: './home-page-view.component.html',
  styleUrls: [ './home-page-view.component.css' ]
})
export class HomePageViewComponent {
  @Input('homePageData') homePageData: HomePageData;
  @ViewChild('changesSaved') private changesSavedAlert: SwalComponent;
  @ViewChild('errorSaving') private errorSavingAlert: SwalComponent;
  private readonly ASSET_PATH: string = 'assets/img/';
  constructor(public readonly dataService: DataServiceService) {

  }
  saveHomePageData() {
    this.dataService.updateHomePageData(this.homePageData).pipe(
      catchError((err, caught) => {
        this.errorSavingAlert.text = 'There was a problem saving your changes. ' + err;
        this.errorSavingAlert.show();
        return observableThrowError(err);
    })).subscribe(val => {
      if (val !== undefined) {
        this.changesSavedAlert.show();
      }
    });
  }
}
