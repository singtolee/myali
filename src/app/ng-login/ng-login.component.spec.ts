import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgLoginComponent } from './ng-login.component';

describe('NgLoginComponent', () => {
  let component: NgLoginComponent;
  let fixture: ComponentFixture<NgLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
