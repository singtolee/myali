import { Component, OnInit, Input, ViewEncapsulation, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../auth.service';
import { CmsService } from '../cms.service';
import { PassSkuService } from '../pass-sku.service';
import { Subscription } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from '../carousel/carousel.component';
import { Add2cartSuccessComponent } from '../add2cart-success/add2cart-success.component';
import { LoginFirstComponent } from '../login-first/login-first.component';
import { ErrorMsgComponent } from '../error-msg/error-msg.component';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CalculatorComponent implements OnInit, OnDestroy {
  @Input() public pname;
  @Input() public sku;
  @Input() public pid;
  @Input() public info;
  @Input() public image;
  @Input() public uw;
  user;
  items;
  subAndQty;
  sub: Subscription; //items
  qtySub: Subscription; //qty and subToatl in CNY;
  usub: Subscription;
  cssub:Subscription;
  costSheet;
  adding:boolean=false;

  constructor(private auth: AuthService, 
              private psku: PassSkuService, 
              private afs: AngularFirestore, 
              private cs: CmsService, 
              private modalService: NgbModal) { }

  ngOnInit() {
    this.psku.reset();
    this.cssub = this.cs.costSheet.subscribe(cs=>this.costSheet=cs)
    
    this.sub = this.psku.items.subscribe(i => this.items = i);
    this.qtySub = this.psku.subAndQty.subscribe(qq => this.subAndQty = qq);
    this.usub = this.auth.user.subscribe(u => this.user = u);
  }
  skuType(){
    if(this.sku.values){
      return 'typeone'
    }
    else{
      return 'typethree'
    }
  }

  overMin() {
    var t = this.getTot()
    if (t >= this.str2num(this.info[0].min_num)) {
      return true
    } else {
      return false
    }
  }

  getTot() {
    var tot = 0;
    for (var i = 0; i < this.items.length; i++) {
      tot = tot + this.items[i].qty
    }
    return tot
  }

  pc() {
    var tot = this.getTot()
    var p
    for (var j = 0; j < this.info.length; j++) {
      if (tot >= this.str2num(this.info[j].min_num)) {
        p = { qty: tot, 
          sc: Math.ceil(tot * this.uw * this.costSheet.land),
          price: tot * this.str2prc(this.info[j].price), 
          cp: this.str2prc(this.info[j].price),
          sugPrice: this.makePrice(this.info[j].price)
        }
      }
    }
    return p
  }

  makePrice(str:string){
    const p = this.str2prc(str)
    return Math.ceil(p*2/10)*10

  }

  str2prc(a) {
    if (typeof (a) == 'number') {
      return Math.ceil(a * this.cs.rate)
    }
    if (typeof (a) == 'string') {
      return Math.ceil(Number(a) * this.cs.rate)
    }

  }

  str2num(a) {
    if (typeof (a) == 'number') {
      return a
    }
    if (typeof (a) == 'string') {
      return Number(a)
    }

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.usub.unsubscribe();
    this.cssub.unsubscribe();
    this.qtySub.unsubscribe();
  }

  isObject(sth) {
    return typeof sth === 'object';
  }

  viewbig(){
    //console.log(this.sku[0].values)
    const modalRef = this.modalService.open(CarouselComponent, {centered: true});
    modalRef.componentInstance.sku = this.sku.values;

  }

  add2cart() {
    if (this.user) {
      this.adding = !this.adding;
      const p = this.pc()
      const data = {
        name: this.pname,
        ordered: false,
        uid: this.user.uid,
        pid: this.pid,
        time: new Date(),
        items: this.items,
        price: p.cp,
        total: p.price,
        qty: p.qty,
        shippingCost:p.sc,
        imageUrl:this.image,
        sugPrice: p.sugPrice,
        earn: p.qty*(p.sugPrice-p.cp) - p.sc,
        checked:true
      }

      this.afs.collection('CARTS').add(data).then(() => {
        this.adding = !this.adding;
        //open add2cart success dialog
        const modalRef = this.modalService.open(Add2cartSuccessComponent, {centered: true});
        modalRef.componentInstance.msg = this.getTot();
        this.psku.reset()
      }).catch((err)=>{
        const modalRef = this.modalService.open(ErrorMsgComponent, {centered: true});
        modalRef.componentInstance.msg = err;
      })
      
    } else {
      const modalRef = this.modalService.open(LoginFirstComponent, {centered: true});
    }
  }

}