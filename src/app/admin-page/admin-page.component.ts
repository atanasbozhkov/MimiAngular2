import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {DataServiceService, PageData} from '../data-service.service';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import {AboutPageData, HomePageData} from '../../../types';
import {Observable} from 'rxjs';
import { includes } from 'lodash';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login-page',
  templateUrl: './admin-page.component.html',
  styleUrls: [ './admin-page.component.css' ]
})

export class AdminPageComponent implements OnInit  {
  email: string;
  password: string;
  router: Router;
  private menuItems: MenuItemComponent[];
  private homePageData: HomePageData;
  private aboutPageData: AboutPageData;
  private selectedView: string;
  private readonly HOME_PAGE_ID = 'Home';

  static isHomePageData(pageData: PageData): pageData is HomePageData {
    return (<HomePageData>pageData).firstName !== undefined;
  }

  static isAboutPageData(pageData: PageData): pageData is AboutPageData {
    return (<AboutPageData>pageData).aboutText !== undefined;
  }
  constructor(router: Router,
              dataService: DataServiceService,
              private route: ActivatedRoute,
              private location: Location) {
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
      } else if (AdminPageComponent.isAboutPageData(pageData)) {
        this.aboutPageData = pageData;
      }
    });
  }

  onMenuItemClick(id) {
    this.selectedView = id;
    // Generate the URL:
    this.router.navigate([], {
      queryParams: {
        view: id
      }
    });
  }

  ngOnInit() {
    // get param
    let selectedView = this.route.snapshot.queryParams['view'];
    console.log(`Got view of: ${selectedView}`);
    if ( selectedView !== null && selectedView !== undefined ) {
      if (this.matchesAnyView(selectedView)) {
        this.selectedView = selectedView;
        return;
      }
    }
    this.selectedView = this.HOME_PAGE_ID; // Set default view for admin panel.

  }

  private matchesAnyView(selectedView: string): boolean {
    return includes(['Home', 'About'], selectedView);
  }

}
