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
  user
  sub:Subscription
  usub:Subscription
  displayup:boolean = false

  constructor(public auth:AuthService, private db:AngularFirestore) {
    this.address = new Address()
  }

  ngOnInit() {
    this.usub = this.auth.user.subscribe(user => this.user = user)
    this.sub = this.auth.address.subscribe(a=>{
      if(a){
        this.address = a
        this.displayup = true
      }
    })
  }
  ngOnDestroy(){
    this.sub.unsubscribe()
    this.usub.unsubscribe()
  }

  togediting(){
    this.displayup = !this.displayup
  }

  saveAddress(formData){
    if(formData.valid){
      if(this.user){
        const ref:AngularFirestoreDocument<any> = this.db.doc(`ADDRESSES/${this.user.uid}`);
        ref.set(Object.assign({}, this.address),{merge:true}).then(()=>{
        }).catch((err)=>{
          console.log('update with error'+err)
        })
      }
    }
  }

  

}
