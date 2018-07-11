import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit {
  @Input() public status;

  constructor() { }

  ngOnInit() {
  }
  convert(a){
    return a.toDate()
  }

  isCancelled(){
    if(this.status.s3.title){
      return true
    }else return false
  }

}
