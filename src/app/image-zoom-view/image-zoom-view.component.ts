import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-zoom-view',
  templateUrl: './image-zoom-view.component.html',
  styleUrls: ['./image-zoom-view.component.css']
})
export class ImageZoomViewComponent implements OnInit {

  @Input() image;

  constructor() { }

  ngOnInit() {
  }

}
