import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageZoomViewComponent } from './image-zoom-view.component';

describe('ImageZoomViewComponent', () => {
  let component: ImageZoomViewComponent;
  let fixture: ComponentFixture<ImageZoomViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageZoomViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageZoomViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
