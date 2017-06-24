import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {MenuItemComponent} from './menu-item/menu-item.component';
import {DataServiceService} from './data-service.service';
import {HomePageComponent} from './home-page/home-page.component';
import {RouterModule} from '@angular/router';
import {AboutPageComponent} from './about-page/about-page.component';
import {MusicPageComponent} from './music-page/music-page.component';
import {LivePageComponent} from './live-page/live-page.component';
import {ContactPageComponent} from './contact-page/contact-page.component';
import {GalleryPageComponent} from './gallery-page/gallery-page.component';
import {TeachingPageComponent} from './teaching-page/teaching-page-component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MenuItemComponent,
    HomePageComponent,
    AboutPageComponent,
    MusicPageComponent,
    LivePageComponent,
    ContactPageComponent,
    GalleryPageComponent,
    TeachingPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: '', component: HomePageComponent},
      {path: 'About', component: AboutPageComponent},
      {path: 'Music', component: MusicPageComponent},
      {path: 'Live', component: LivePageComponent},
      {path: 'Gallery', component: GalleryPageComponent},
      {path: 'Teaching', component: TeachingPageComponent},
      {path: 'Contact', component: ContactPageComponent}
    ])
  ],
  // providers: [DataServiceService, { provide: 'Window', useValue: window}],
  providers: [DataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
