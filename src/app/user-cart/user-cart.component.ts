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
  carts:any

  constructor(private auth: AuthService,private db: AngularFirestore) {
  }

  ngOnInit() {
    this.sub = this.auth.user.subscribe((user)=>{
      this.user = user;
      if(user){
        this.carts = this.loadCart2(user.uid)
      }
    })
  }
  ngOnDestroy(){
    this.sub.unsubscribe()
  }

  convert(a){
    return a.toDate()
  }

  loadCart2(uid:string){
    return this.db.collection(this.dir, ref=>{
      return ref.where('uid','==',uid)
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

}
