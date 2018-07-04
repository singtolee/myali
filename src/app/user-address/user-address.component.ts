import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { Address } from '../tools/Address'

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css']
})
export class UserAddressComponent implements OnInit, OnDestroy {

  address:Address
  sub:Subscription

  constructor(public auth:AuthService) {
    this.address = new Address()
    console.log('Here you are:' + this.address)
  }

  ngOnInit() {
    this.sub = this.auth.address.subscribe(a=>{
      if(a){
        console.log("I am not null")
        this.address = a
      }
    })
  }
  ngOnDestroy(){
    this.sub.unsubscribe()
  }

  

}
