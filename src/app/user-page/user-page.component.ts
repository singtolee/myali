import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { Address } from '../tools/Address'

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit, OnDestroy {

  //address:Address;
  a:Address;
  user;
  usub: Subscription;
  asub:Subscription;
  isEditing:boolean = false;

  constructor(public auth: AuthService,private db:AngularFirestore) {
    //this.address = new Address();
   }

   togediting(){
     this.isEditing = !this.isEditing
   }

   editme(){
     if(this.a && this.isEditing == false){
       return true
     }else{
       return false
     }
   }

  ngOnInit() {
    this.usub = this.auth.user.subscribe(u => this.user = u);
    this.asub = this.auth.address.subscribe(ad => {
      if(ad){
        this.a = ad
      }else{
        this.a = new Address();
      }
    })
  }

  ngOnDestroy(){
    this.usub.unsubscribe();
  }

  saveAddress(formData){
    if(formData.valid){
      if(this.user){
        const ref:AngularFirestoreDocument<any> = this.db.doc(`ADDRESSES/${this.user.uid}`);
        ref.set(Object.assign({}, this.a),{merge:true})
      }
    }
  }

  logout(){
    this.auth.signOut()
  }

  isempty(obj){
    for(var key in obj){
      if(obj.hasOwnProperty(key)){
        return false
      }

    }
    return true
  }

}
