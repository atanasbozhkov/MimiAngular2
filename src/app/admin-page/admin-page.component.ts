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
  private readonly LOGIN_URL = '/login';
  private readonly VIEW_PARAM: string = 'view';

  static isHomePageData(pageData: PageData): pageData is HomePageData {
    return (<HomePageData>pageData).firstName !== undefined;
  }

  static isAboutPageData(pageData: PageData): pageData is AboutPageData {
    return (<AboutPageData>pageData).aboutText !== undefined;
  }

  constructor(router: Router,
              private dataService: DataServiceService,
              private route: ActivatedRoute) {
    this.router = router;
    this.redirectIfUnauthenticated();
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
    // Generate the URL params
    this.router.navigate([], {
      queryParams: {
        [this.VIEW_PARAM]: id
      }
    });
  }

  ngOnInit() {
    let selectedView = this.route.snapshot.queryParams[this.VIEW_PARAM];
    if ( selectedView !== null && selectedView !== undefined ) {
      if (this.matchesAnyView(selectedView)) {
        this.selectedView = selectedView;
        return;
      }
    }
    this.selectedView = this.HOME_PAGE_ID; // Set default view for admin panel.
  }

  private redirectIfUnauthenticated() {
    let isNotAuthenticated = this.dataService === undefined ||
      this.dataService.isAuthenticated === undefined ||
      !this.dataService.isAuthenticated();
    if (isNotAuthenticated) {
      this.router.navigateByUrl(this.LOGIN_URL);
    }
  }

  private matchesAnyView(selectedView: string): boolean {
    return includes(this.dataService.getPageList(), selectedView);
  }

}
