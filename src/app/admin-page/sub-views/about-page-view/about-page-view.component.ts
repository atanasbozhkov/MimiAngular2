import {Component, Input, ViewChild} from '@angular/core';
import {AboutPageData} from '../../../../../types';
import {DataServiceService} from "../../../data-service.service";
import {SwalComponent} from "@toverux/ngx-sweetalert2";

@Component({
  selector: 'app-about-page-view',
  templateUrl: './about-page-view.component.html',
  styleUrls: ['./about-page-view.component.css']
})
export class AboutPageViewComponent {
  @Input('aboutPageData') aboutPageData: AboutPageData;
  @ViewChild('changesSaved') private changesSavedAlert: SwalComponent;
  @ViewChild('errorSaving') private errorSavingAlert: SwalComponent;

  constructor(public readonly dataService: DataServiceService) {

  }

  public saveAboutPageData() {
    return;
  }
}
