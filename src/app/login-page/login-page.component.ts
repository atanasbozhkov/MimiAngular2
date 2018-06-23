import { Component, OnInit } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Data, Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import {AuthService} from '../services/auth.service';
import {PageUrls} from '../admin-page/page-urls';

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
    this.loginSessionSubscriber();
  }

  loginSessionSubscriber() {
    this.authService.onSessionChange( authState => {
      if (this.authService.isLoggedIn()) {
        this.login();
      }
    });
  }

  login() {
    if (this.authService.isLoggedIn()) {
      console.log(`User already logged in.`);
      this.router.navigateByUrl('/admin');
      return;
    }
    if (!this.isInputValid(this.email, this.password)) {
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

  private toHomePage() {
    this.router.navigateByUrl(PageUrls.HOME);
  }

  private isInputValid(email: string, password: string): boolean {
    if (email === null || email === undefined) {
      return false;
    }
    if (password === null || password === undefined) {
      return false;
    }
    return true;
  }
}
