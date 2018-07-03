import { Component, OnInit, Input, ViewEncapsulation, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthService } from '../auth.service';
import { PassSkuService } from '../pass-sku.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class CalculatorComponent implements OnInit, OnDestroy {

  @Input() public sku;
  @Input() public pid;
  @Input() public info;
  islogin:boolean=false;
  user;
  items;
  sub:Subscription;
  usub:Subscription;

  constructor(private auth:AuthService,private psku:PassSkuService,private afs: AngularFirestore) { }

  ngOnInit() {
    this.psku.reset();
    this.sub = this.psku.items.subscribe(i=>this.items = i);
    this.usub = this.auth.user.subscribe(u=>{
      this.user = u;
      this.islogin = true

    });
  }

  overMin(){
    var t = this.getTot()
    if(t>=this.str2num(this.info[0].min_num)){
      return true
    }else{
      return false
    }
  }

  getTot(){
    var tot = 0;
    for(var i=0;i<this.items.length;i++){
      tot = tot + this.items[i].qty
    }
    return tot
  }

  pc(){
    var tot = this.getTot()
    var p
    for(var j=0;j<this.info.length;j++){
      if(tot>=this.str2num(this.info[j].min_num)){
        p = {qty:tot,price:tot*this.str2prc(this.info[j].price),cp:this.str2prc(this.info[j].price)}
      }
    }
    return p
  }

  str2prc(a){
    if(typeof(a)=='number'){
      return Math.ceil(a*6)
    }
    if(typeof(a) =='string'){
      return Math.ceil(Number(a)*6)
    }

  }

  str2num(a){
    if(typeof(a)=='number'){
      return a
    }
    if(typeof(a) =='string'){
      return Number(a)
    }

  }

  ngOnDestroy(){
    this.sub.unsubscribe();
    this.usub.unsubscribe();
  }

  isObject(sth){
    return typeof sth === 'object';
  }

  buynow(){
  }
  add2cart(){
    if(this.user){
      console.log(this.user.uid)
      const data = {
        uid:this.user.uid,
        pid:this.pid,
        time:new Date(),
        items:this.items,
      }
      this.afs.collection('CARTS').add(data).then(()=>{
        this.psku.reset()
      })
    }else{
      this.islogin = false
    }
  }

}
