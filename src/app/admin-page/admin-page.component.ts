import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {DataServiceService, PageData} from '../data-service.service';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import {AboutPageData, HomePageData} from '../../../types';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './admin-page.component.html',
  styleUrls: [ './admin-page.component.css' ]
})

export class AdminPageComponent {
  email: string;
  password: string;
  router: Router;
  private menuItems: MenuItemComponent[];
  private homePageData: HomePageData;
  private aboutPageData: AboutPageData;
  private selectedView: string;
  private readonly HOME_PAGE_ID = 'Home';

  constructor(router: Router, dataService: DataServiceService) {
    this.router = router;
    let isNotAuthenticated = dataService === undefined ||
      dataService.isAuthenticated === undefined ||
      !dataService.isAuthenticated();

    if (isNotAuthenticated) {
      this.router.navigateByUrl('/login');
    }
    this.menuItems = dataService.getMenuItems();
    const observable: Observable<PageData> = dataService.getPageData();
    observable.subscribe(pageData => {
      if (AdminPageComponent.isHomePageData(pageData)) {
        this.homePageData = pageData;
        this.selectedView = this.HOME_PAGE_ID; // Set default view for admin panel.
      } else if (AdminPageComponent.isAboutPageData(pageData)) {
        this.aboutPageData = pageData;
      }
    });
  }

  static isHomePageData(pageData: PageData): pageData is HomePageData {
    return (<HomePageData>pageData).firstName !== undefined;
  }

  static isAboutPageData(pageData: PageData): pageData is AboutPageData {
    return (<AboutPageData>pageData).aboutText !== undefined;
  }
  onMenuItemClick(id) {
    this.selectedView = id;
  }

}
