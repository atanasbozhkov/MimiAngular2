import { Component, OnInit } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Data, Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: [ './login-page.component.css' ]
})

export class LoginPageComponent {
  email: string;
  password: string;
  router: Router;
  dataService: DataServiceService;

  constructor(router: Router, dataService: DataServiceService) {
    this.router = router;
    this.dataService = dataService;
  }

  onClick() {
    this.login();
  }

  login() {
    console.log(this.email + ' ' + this.password);
    this.dataService.login(this.email, this.password)
    this.router.navigateByUrl('/admin');
  }
}
