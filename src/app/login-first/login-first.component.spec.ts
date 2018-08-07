import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFirstComponent } from './login-first.component';

describe('LoginFirstComponent', () => {
  let component: LoginFirstComponent;
  let fixture: ComponentFixture<LoginFirstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFirstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
