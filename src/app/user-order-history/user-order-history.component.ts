import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../auth.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators'

interface Order {
  grandTotal:number;
  shippingCost:number;
  time:Date;
  total:number;
  uid:string;
  cartArray:string[];
}

@Component({
  selector: 'app-user-order-history',
  templateUrl: './user-order-history.component.html',
  styleUrls: ['./user-order-history.component.css']
})
export class UserOrderHistoryComponent implements OnInit,OnDestroy {
  user;
  sub:Subscription;
  dir = "ORDERS";
  orders:Observable<any>;

  constructor(private auth: AuthService,private db: AngularFirestore) { }

  ngOnInit() {
    this.sub = this.auth.user.subscribe((user)=>{
      this.user = user;
      if(user){
        this.orders = this.loadOrders2(user.uid)
      }
    })
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }

  convert(a){
    return a.toDate()
  }

  loadOrders2(uid:string){
    return this.db.collection(this.dir, ref=>{
      return ref.where('uid','==',uid)
      .orderBy('time','desc')
    }).snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Order;
        const id = a.payload.doc.id;
        return {id,data};
      })
    }))
  }

  editStatus(cart:any){

    if(!this.isOver24h(cart)){
      this.db.doc(this.dir + '/' + cart.id).update({'status.s3':{time:new Date(),title:'cancelled'}})
    }
  }

  isOver24h(cart:any){
    var now = new Date()
    var dd = new Date(cart.data.status.s1.time.toDate())
    dd.setDate(dd.getDate()+1)
    if(now>dd){
      return true
    }else{
      return false
    }

  }

}
