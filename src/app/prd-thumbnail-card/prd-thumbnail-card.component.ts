import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-prd-thumbnail-card',
  templateUrl: './prd-thumbnail-card.component.html',
  styleUrls: ['./prd-thumbnail-card.component.css']
})
export class PrdThumbnailCardComponent implements OnInit {

  @Input() public prd;

  constructor() { }

  ngOnInit() {
  }

}
