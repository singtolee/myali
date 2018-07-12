import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FectchBankAccountComponent } from './fectch-bank-account.component';

describe('FectchBankAccountComponent', () => {
  let component: FectchBankAccountComponent;
  let fixture: ComponentFixture<FectchBankAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FectchBankAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FectchBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
