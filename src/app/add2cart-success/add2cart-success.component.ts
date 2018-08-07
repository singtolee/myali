import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add2cart-success',
  templateUrl: './add2cart-success.component.html',
  styleUrls: ['./add2cart-success.component.css']
})
export class Add2cartSuccessComponent implements OnInit {

  @Input() public msg

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
