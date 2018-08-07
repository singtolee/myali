import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Add2cartSuccessComponent } from './add2cart-success.component';

describe('Add2cartSuccessComponent', () => {
  let component: Add2cartSuccessComponent;
  let fixture: ComponentFixture<Add2cartSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Add2cartSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Add2cartSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
