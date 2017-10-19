import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { HomePageData } from '../../../types';

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
  private selectedView: string;

  constructor(router: Router, dataService: DataServiceService) {
    this.router = router;
    if (dataService === undefined || dataService.isAuthenticated === undefined || !dataService.isAuthenticated()) {
      this.router.navigateByUrl('/login');
    }
    this.menuItems = dataService.getMenuItems();
    dataService.getHomePageData().subscribe(data => {
      this.homePageData = data;
      console.log(data);
    });
  }

  onMenuItemClick(id) {
    this.selectedView = id;
  }

}
