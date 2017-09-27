import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  title: string;
  url: string;
  isActive: boolean;

  constructor(title: string, url: string, isActive = false) {
    this.title = title;
    this.url = url;
    this.isActive = isActive;
  }

  ngOnInit() {
  }

}
