
import {throwError as observableThrowError, Observable} from 'rxjs';

import {catchError} from 'rxjs/operators';
import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {AboutPageData} from '../../../../../types';
import {DataServiceService} from '../../../data-service.service';
import {SwalComponent} from '@toverux/ngx-sweetalert2';
import {setTime} from 'ngx-bootstrap/timepicker/timepicker.utils';

@Component({
  selector: 'app-about-page-view',
  templateUrl: './about-page-view.component.html',
  styleUrls: ['./about-page-view.component.css']
})
export class AboutPageViewComponent implements AfterViewInit {
  @Input('aboutPageData') aboutPageData: AboutPageData;
  @ViewChild('changesSaved') private changesSavedAlert: SwalComponent;
  @ViewChild('errorSaving') private errorSavingAlert: SwalComponent;

  constructor(public readonly dataService: DataServiceService) {
    this.aboutPageData = new AboutPageData ({
      aboutText: '',
      photoUrl: ''
    });
  }

  ngAfterViewInit(): void {
    // For removing annoying bar
    setTimeout(() => {
      let frwrapper = document.querySelector('.fr-wrapper div:not(.fr-view)');
      if (frwrapper !== undefined && frwrapper !== null) {
        frwrapper.remove();
      }
    }, 500);

  }

  public saveAboutPageData() {
    this.dataService.updateAboutPageData(this.aboutPageData).pipe(
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
