import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DataServiceService } from './data-service.service';
import { FirebaseService } from './services/firebase.service';
import {AuthService} from './services/auth.service';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { MusicPageComponent } from './music-page/music-page.component';
import { LivePageComponent } from './live-page/live-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { GalleryPageComponent } from './gallery-page/gallery-page.component';
import { TeachingPageComponent } from './teaching-page/teaching-page-component';
import { LoginPageComponent } from './login-page/login-page.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ImageCropperModule } from 'ngx-img-cropper';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';


import {
  HomePageViewComponent,
  AboutPageViewComponent,
  MusicPageViewComponent,
  GalleryPageViewComponent,
  AssetManagementViewComponent
} from './admin-page/sub-views/';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {HttpClientModule} from '@angular/common/http';
import {angularFireConfig} from './config/config';
const adminPageViews = [
  HomePageViewComponent,
  AboutPageViewComponent,
  MusicPageViewComponent,
  GalleryPageViewComponent,
  AssetManagementViewComponent
];

@NgModule({
  declarations: [
    AppComponent,
    AdminPageComponent,
    MenuComponent,
    HomePageComponent,
    AboutPageComponent,
    MusicPageComponent,
    LivePageComponent,
    ContactPageComponent,
    GalleryPageComponent,
    TeachingPageComponent,
    LoginPageComponent,
    ...adminPageViews
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    BsDropdownModule.forRoot(),
    SweetAlert2Module.forRoot(),
    AngularFireModule.initializeApp(angularFireConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ImageCropperModule,
    RouterModule.forRoot([
      {path: '', component: HomePageComponent},
      {path: 'About', component: AboutPageComponent},
      {path: 'Music', component: MusicPageComponent},
      {path: 'Live', component: LivePageComponent},
      {path: 'Gallery', component: GalleryPageComponent},
      {path: 'Teaching', component: TeachingPageComponent},
      {path: 'Contact', component: ContactPageComponent},
      {path: 'login', component: LoginPageComponent},
      {path: 'admin', component: AdminPageComponent}
    ])
  ],
  providers: [ DataServiceService, FirebaseService, AuthService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
