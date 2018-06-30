import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-qtypicker',
  templateUrl: './qtypicker.component.html',
  styleUrls: ['./qtypicker.component.css']
})
export class QtypickerComponent implements OnInit {

  @Input() public size;
  @Input() public color;
  qty = 0

  constructor() { }

  ngOnInit() {
  }

  inc(){
    this.qty = this.qty + 1

  }

  des(){
    this.qty = this.qty -1
    if(this.qty<0){
      this.qty=0
    }

  }

}
