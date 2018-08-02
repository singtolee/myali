import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrdThumbnailCardComponent } from './prd-thumbnail-card.component';

describe('PrdThumbnailCardComponent', () => {
  let component: PrdThumbnailCardComponent;
  let fixture: ComponentFixture<PrdThumbnailCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrdThumbnailCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrdThumbnailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
