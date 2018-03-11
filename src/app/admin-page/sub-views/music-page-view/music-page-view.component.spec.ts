import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicPageViewComponent } from './music-page-view.component';

describe('MusicPageViewComponent', () => {
  let component: MusicPageViewComponent;
  let fixture: ComponentFixture<MusicPageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicPageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicPageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
