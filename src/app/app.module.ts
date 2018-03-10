import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { DataServiceService } from './data-service.service';
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
import { HomePageViewComponent, AboutPageViewComponent }  from './admin-page/sub-views/';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
  declarations: [
    AppComponent,
    AdminPageComponent,
    MenuComponent,
    MenuItemComponent,
    HomePageComponent,
    HomePageViewComponent,
    AboutPageViewComponent,
    AboutPageComponent,
    MusicPageComponent,
    LivePageComponent,
    ContactPageComponent,
    GalleryPageComponent,
    TeachingPageComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    BsDropdownModule.forRoot(),
    SweetAlert2Module.forRoot(),
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
  providers: [ DataServiceService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
