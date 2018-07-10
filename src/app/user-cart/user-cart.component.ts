import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators'
import { Cart } from '../tools/Cart';


@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit, OnDestroy {

  user;
  sub:Subscription;
  dir = "CARTS";
  carts:any;
  cartSub:Subscription;
  spinning:boolean=false;

  constructor(private auth: AuthService,private db: AngularFirestore) {
  }

  ngOnInit() {
    this.sub = this.auth.user.subscribe((user)=>{
      this.user = user;
      if(user){
        this.cartSub = this.loadCart2(user.uid).subscribe(c=>this.carts=c)
      }
    })
  }
  ngOnDestroy(){
    this.sub.unsubscribe()
    if(this.cartSub){
      this.cartSub.unsubscribe()
    }
  }

  checkout(){
    if(this.user){
      this.spinning = true
      var cal = this.cal()
      const data = {
        uid: this.user.uid,
        time: new Date(),
        total: cal.t,
        shippingCost: cal.s,
        cartArray:cal.arr,
        grandTotal: cal.t + cal.s
      }

      this.db.collection('ORDERS').add(data).then(() => {
        this.spinning = false
        //delete from cart
        for(var i=0;i<data.cartArray.length;i++){
          this.set2true(data.cartArray[i])
        }
        
      }).catch(err=>{
        this.spinning = false
        //show err msg
      })
    }
  }

  cal(){
    var total = 0;
    var sc = 0;
    var arr = [];
    for(var i=0;i<this.carts.length;i++){
      if(this.carts[i].data.checked){
        total = total + this.carts[i].data.total
        sc = sc + this.carts[i].data.shippingCost
        arr.push(this.carts[i].id)
      }
    }

    return {t:total,s:sc>199? sc:199, arr:arr}
  }
  cartChecked(){
    var c = this.cal()
    if(c.t>0){
      return true
    }else return false
  }

  convert(a){
    return a.toDate()
  }

  loadCart2(uid:string){
    return this.db.collection(this.dir, ref=>{
      return ref.where('uid','==',uid)
      .where('ordered','==',false)
      .orderBy('time','desc')
    }).snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Cart;
        const id = a.payload.doc.id;
        return {id,data};
      })
    }))
  }

  del(id:string){
    this.db.doc(this.dir + '/' + id).delete().then(()=>{
    }).catch((e)=>{
      console.log(e)
    })
  }

  set2true(id:string){
    this.db.doc(this.dir + '/' + id).update({ordered:true})
  }

}
