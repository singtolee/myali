import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiProductDetailComponent } from './api-product-detail.component';

describe('ApiProductDetailComponent', () => {
  let component: ApiProductDetailComponent;
  let fixture: ComponentFixture<ApiProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiProductDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
