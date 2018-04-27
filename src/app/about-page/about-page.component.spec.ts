/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPageComponent } from './about-page.component';
import { Component, Input } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { DataServiceService } from '../data-service.service';

// Stub menu component
// TODO: Nasco - move this to a common stub class
@Component({selector: 'app-menu', template: ''})
export class AppMenuStubComponent {
  @Input() active = true;
}

describe('AboutPageComponent', () => {
  let component: AboutPageComponent;
  let fixture: ComponentFixture<AboutPageComponent>;
  const testAboutText: string = 'Test about text';
  const dataService =
    jasmine.createSpyObj('DataService', ['aboutText']);
  const getAboutTextSpy = dataService.aboutText.and.returnValue(of(testAboutText));
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutPageComponent, AppMenuStubComponent ],
      providers: [
        { provide: DataServiceService, useValue: dataService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
