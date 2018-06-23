import {Component, Input, ViewChild} from '@angular/core';
import { HomePageData } from '../../.././types';
import {DataServiceService} from '../../../data-service.service';
import {SwalComponent} from '@toverux/ngx-sweetalert2';

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
    this.dataService.updateHomePageData(this.homePageData).then(result => {
      if (result === undefined) {
        this.changesSavedAlert.show();
      }
    }).catch(error => {
      this.errorSavingAlert.text = 'There was a problem saving your changes. ' + error.message;
      this.errorSavingAlert.show();
    });
  }
}
