import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit, OnDestroy {
  currentJustify = 'fill';

  constructor() {
   }

  ngOnInit() {
  }

  ngOnDestroy(){
  }

}
