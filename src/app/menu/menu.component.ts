import {Component, OnInit, Input} from '@angular/core';
import {MenuItemComponent} from '../menu-item/menu-item.component';
import {DataServiceService} from '../data-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: MenuItemComponent[];
  @Input() active: string;

  constructor(private dataService: DataServiceService) {
    this.menuItems = dataService.getMenuItems();
  }

  ngOnInit() {
    // Set the active tab.
    this.changeActive(this.active);
  }

  changeActive(title: string) {
    for (let menuItem of this.menuItems) {
      menuItem.isActive = menuItem.title.toLowerCase() === title.toLowerCase();
    }
  }

}
