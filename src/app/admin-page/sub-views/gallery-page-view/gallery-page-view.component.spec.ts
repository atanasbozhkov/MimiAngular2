import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryPageViewComponent } from './gallery-page-view.component';

describe('GalleryPageViewComponent', () => {
  let component: GalleryPageViewComponent;
  let fixture: ComponentFixture<GalleryPageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryPageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryPageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
