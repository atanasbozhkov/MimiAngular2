import {Component, Input, ViewChild} from '@angular/core';
import {AboutPageData} from '../../../../../types';
import {DataServiceService} from '../../../data-service.service';
import {SwalComponent} from '@toverux/ngx-sweetalert2';
import {Observable} from 'rxjs';

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
    this.aboutPageData = new AboutPageData ({
      aboutText: '',
      photoUrl: ''
    });
  }

  public saveAboutPageData() {
    this.dataService.updateAboutPageData(this.aboutPageData)
      .catch((err, caught) => {
        this.errorSavingAlert.text = 'There was a problem saving your changes. ' + err;
        this.errorSavingAlert.show();
        return Observable.throw(err);
      }).subscribe(val => {
      if (val !== undefined) {
        this.changesSavedAlert.show();
      }
    });
  }
}
