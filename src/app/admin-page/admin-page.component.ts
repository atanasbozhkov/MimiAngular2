import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {DataServiceService, PageData} from '../data-service.service';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import {AboutPageData, HomePageData} from '.././types';
import {Observable} from 'rxjs';
import { includes } from 'lodash';
import {AuthService} from '../services/auth.service';

enum SUBVIEW_MAPPING {
  HOME = 'Home',
  ABOUT = 'About',
  GALLERY = 'Gallery',
  ASSET = 'Asset Library',
  MUSIC = 'Music'
}
@Component({
  selector: 'app-login-page',
  templateUrl: './admin-page.component.html',
  styleUrls: [ './admin-page.component.css' ]
})

export class AdminPageComponent implements OnInit  {
  private email: string;
  private password: string;
  private menuItems: MenuItemComponent[];
  private pageList: Array<string>;
  private homePageData: HomePageData;
  private aboutPageData: AboutPageData;
  private selectedView: string;
  private readonly HOME_PAGE_ID = SUBVIEW_MAPPING.HOME;
  private readonly LOGIN_URL = '/login';
  private readonly VIEW_PARAM: string = 'view';
  private readonly VIEW_MAP = SUBVIEW_MAPPING;

  static isHomePageData(pageData: PageData): pageData is HomePageData {
    return (<HomePageData>pageData).firstName !== undefined;
  }

  static isAboutPageData(pageData: PageData): pageData is AboutPageData {
    return (<AboutPageData>pageData).aboutText !== undefined;
  }

  constructor(private router: Router,
              private dataService: DataServiceService,
              private route: ActivatedRoute,
              private authService: AuthService) {
    this.redirectIfUnauthenticated();
    this.menuItems = dataService.getMenuItems();
    this.menuItems = this.menuItems.concat(this.getAdminPageViews());
    this.pageList = this.dataService.getPageList().concat(this.getAdminPageViews().map(view => view.title));
    const observable: Observable<PageData> = dataService.getPageData();
    // TODO: Nasco - I don't know why I wrote this. Consider removing in
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
    this.router.navigate([], {
      queryParams: {
        [this.VIEW_PARAM]: id
      }
    });
  }

  ngOnInit() {
    const selectedView = this.route.snapshot.queryParams[this.VIEW_PARAM];
    if ( selectedView !== null && selectedView !== undefined ) {
      if (this.matchesAnyView(selectedView)) {
        this.selectedView = selectedView;
        return;
      }
    }
    this.selectedView = this.HOME_PAGE_ID; // Set default view for admin panel.
  }

  private redirectIfUnauthenticated() {
    const isNotAuthenticated = this.dataService === undefined ||
      this.dataService.isAuthenticated === undefined ||
      !this.dataService.isAuthenticated();
    if (isNotAuthenticated) {
      this.router.navigateByUrl(this.LOGIN_URL);
    }
  }

  private getAdminPageViews(): Array<MenuItemComponent> {
    return [ new MenuItemComponent('Asset Library', '/assets') ];
  }

  private matchesAnyView(selectedView: string): boolean {
    return includes(this.pageList, selectedView);
  }

  private logout() {
    console.log(`Loggig out`);
    this.authService.logout();
  }

}
