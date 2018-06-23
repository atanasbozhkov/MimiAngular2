import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {AboutPageData} from '../../../types';
import {DataServiceService} from '../../../data-service.service';
import {SwalComponent} from '@toverux/ngx-sweetalert2';

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
      const frwrapper = document.querySelector('.fr-wrapper div:not(.fr-view)');
      if (frwrapper !== undefined && frwrapper !== null) {
        frwrapper.remove();
      }
    }, 500);

  }

  public saveAboutPageData() {
    this.dataService.updateAboutPageData(this.aboutPageData).then(result => {
      if (result === undefined) {
        this.changesSavedAlert.show();
      }
    }).catch(error => {
      this.errorSavingAlert.text = 'There was a problem saving your changes. ' + error.message;
      this.errorSavingAlert.show();
    });
  }
}
