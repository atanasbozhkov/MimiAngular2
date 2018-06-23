import { Component, OnInit } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Data, Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import {AuthService} from '../services/auth.service';

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

  constructor(router: Router, dataService: DataServiceService, private authService: AuthService) {
    this.router = router;
    this.dataService = dataService;
  }

  login() {
    this.authService.isLoggedIn().then(user => {
      if (user) {
        console.log(`User already logged in.`);
        return;
      }
    });
    if (!this.validateParams(this.email, this.password)) {
      console.error(`Please enter email/password details`);
      return;
    }

    this.authService.userLogin(this.email, this.password)
      .then(userDidLogIn => {
        if (userDidLogIn) {
          this.router.navigateByUrl('/admin');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  private validateParams(email: string, password: string): boolean {
    if (email === null || email === undefined) {
      return false;
    }
    if (password === null || password === undefined) {
      return false;
    }
    return true;
  }
}
