import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../auth.service';
import { Observable, Subscription } from 'rxjs';
import { Order } from '../tools/Order';

@Component({
  selector: 'app-user-order-history',
  templateUrl: './user-order-history.component.html',
  styleUrls: ['./user-order-history.component.css']
})
export class UserOrderHistoryComponent implements OnInit,OnDestroy {
  user;
  sub:Subscription;
  dir = "ORDERS";
  orders:Observable<Order[]>;

  constructor(private auth: AuthService,private db: AngularFirestore) { }

  ngOnInit() {
    this.sub = this.auth.user.subscribe((user)=>{
      this.user = user;
      if(user){
        this.orders = this.loadOrders(user.uid)
      }
    })
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }

  convert(a){
    return a.toDate()
  }

  loadOrders(uid:string){
    return this.db.collection<Order>(this.dir,ref=>{
      return ref.where('uid','==',uid)
      .orderBy('time','desc')
    }).valueChanges()
  }

}
