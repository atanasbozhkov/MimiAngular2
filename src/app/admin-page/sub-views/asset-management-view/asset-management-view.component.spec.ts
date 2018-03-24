import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetManagementViewComponent } from './asset-management-view.component';

describe('AssetManagementViewComponent', () => {
  let component: AssetManagementViewComponent;
  let fixture: ComponentFixture<AssetManagementViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetManagementViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetManagementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
