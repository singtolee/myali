import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QtypickerComponent } from './qtypicker.component';

describe('QtypickerComponent', () => {
  let component: QtypickerComponent;
  let fixture: ComponentFixture<QtypickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QtypickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QtypickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
