import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlApiComponent } from './url-api.component';

describe('UrlApiComponent', () => {
  let component: UrlApiComponent;
  let fixture: ComponentFixture<UrlApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
