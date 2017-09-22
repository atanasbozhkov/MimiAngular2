import { Component, Input, OnInit } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: [ './menu.component.css', './hamburgers.css' ]
})
export class MenuComponent implements OnInit {
  menuItems: MenuItemComponent[];
  @Input() active: string;
  showStyle = false;
  menuClass = false;
  state = 'fadeIn';

  constructor(private dataService: DataServiceService) {
    this.menuItems = dataService.getMenuItems();
  }

  ngOnInit() {
    // Set the active tab.
    this.changeActive(this.active);
  }

  changeState() {
    window.scrollTo(0, 0);
    this.state === 'fadeIn' ? this.state = 'fadeOut' : this.state = 'fadeIn';
    this.menuClass === false ? this.menuClass = true : this.menuClass = false;
  }


  changeActive(title: string) {
    for (let menuItem of this.menuItems) {
      menuItem.isActive = menuItem.title.toLowerCase() === title.toLowerCase();
    }
  }

}
