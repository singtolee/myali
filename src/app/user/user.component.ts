import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgLoginComponent } from '../ng-login/ng-login.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(public auth: AuthService, private modalService: NgbModal) { }

  ngOnInit() {}

  openlogin(){
    const modalRef = this.modalService.open(NgLoginComponent,{ centered: true });
  }
}