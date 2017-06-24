import {Component, OnInit, Input} from '@angular/core';
import {MenuItemComponent} from '../menu-item/menu-item.component';
import {DataServiceService} from '../data-service.service';
import { animateFactory } from 'ng2-animate';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css', './hamburgers.css']
  // animations: [animateFactory(1000, 500, 'fadeIn'), animateFactory(1000, 500, 'fadeOut')]
})
export class MenuComponent implements OnInit {
  menuItems: MenuItemComponent[];
  @Input() active: string;
  showStyle: false;
  state = 'fadeIn';

  constructor(private dataService: DataServiceService) {
    this.menuItems = dataService.getMenuItems();
  }

  ngOnInit() {
    // Set the active tab.
    this.changeActive(this.active);
  }

  changeState() {
    this.state === 'fadeIn' ? this.state = 'fadeOut' : this.state = 'fadeIn';
  }


  changeActive(title: string) {
    for (let menuItem of this.menuItems) {
      menuItem.isActive = menuItem.title.toLowerCase() === title.toLowerCase();
    }
  }

}
