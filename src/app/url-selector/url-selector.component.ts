import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

interface Info {
  isDesktop:boolean;
  keyword:string;
  aliUrl:string;
  jdUrl:string;
}

@Component({
  selector: 'app-url-selector',
  templateUrl: './url-selector.component.html',
  styleUrls: ['./url-selector.component.css']
})
export class UrlSelectorComponent implements OnInit {

  public info:Info;
  constructor(public activeModal: NgbActiveModal,private router:Router) { }

  ngOnInit() {
  }

  closeModal(){
    this.router.navigate(['/urlapi']);
    this.activeModal.close()
  }

}
