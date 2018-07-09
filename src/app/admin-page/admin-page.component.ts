import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {DataServiceService, PageData} from '../data-service.service';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import {AboutPageData, HomePageData} from '../types';
import {Observable} from 'rxjs';
import { includes } from 'lodash';
import {AuthService} from '../services/auth.service';
import {PageUrls} from './page-urls';

enum SUBVIEW_MAPPING {
  HOME = 'Home',
  ABOUT = 'About',
  LIVE = 'Live',
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
  public menuItems: MenuItemComponent[];
  private pageList: Array<string>;
  private homePageData: HomePageData;
  private aboutPageData: AboutPageData;
  public selectedView: string;
  private readonly HOME_PAGE_ID = SUBVIEW_MAPPING.HOME;
  private readonly VIEW_PARAM: string = 'view';
  public readonly VIEW_MAP = SUBVIEW_MAPPING;

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
    console.log(`View initialised`);
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
    if (this.authService.isLoggedIn()) {
      return;
    }
    console.error('User not authenticated - redirecting to login page');
    this.router.navigateByUrl(PageUrls.LOGIN);
  }

  private getAdminPageViews(): Array<MenuItemComponent> {
    return [ new MenuItemComponent('Asset Library', '/assets') ];
  }

  private matchesAnyView(selectedView: string): boolean {
    return includes(this.pageList, selectedView);
  }

  public logout() {
    console.log(`Logging out`);
    this.authService.logout();
    this.router.navigateByUrl(PageUrls.LOGIN);
  }

}
