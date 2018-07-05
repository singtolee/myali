import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../auth.service';
import { Observable, Subscription } from 'rxjs';
import { Cart } from '../tools/Cart';
import { toDate, formatDate } from '@angular/common/src/i18n/format_date';


@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit, OnDestroy {

  user;
  sub:Subscription;
  dir = "CARTS";
  carts: Observable<Cart[]>;

  constructor(private auth: AuthService,private db: AngularFirestore) {
  }

  ngOnInit() {
    this.sub = this.auth.user.subscribe((user)=>{
      this.user = user;
      if(user){
        this.carts = this.loadCart(user.uid)
      }
    })
  }
  ngOnDestroy(){
    this.sub.unsubscribe()
  }

  loadCart(uid:string){
    return this.db.collection<Cart>(this.dir,ref=>{
      return ref.where('uid','==',uid)
      .orderBy('time','desc')
    }).valueChanges()
  }

}
