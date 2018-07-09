import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivePageViewComponent } from './live-page-view.component';

describe('LivePageViewComponent', () => {
  let component: LivePageViewComponent;
  let fixture: ComponentFixture<LivePageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivePageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivePageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
