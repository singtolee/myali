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
  sub: Subscription; //items
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
    if (t.tot >= this.str2num(this.info[0].min_num)) {
      return true
    } else {
      return false
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

  getTot() {

    //get items quantity
    var qtyArr = this.items.map(itemObj=>itemObj.qty);
    var totQty = qtyArr.reduce(((acc,num)=>acc+num),0);

    //get sub total in THB
    var subArr = this.items.map(itemObj=>itemObj.qty*Math.ceil(itemObj.size.price*this.cs.rate))
    var subTotal = subArr.reduce(((acc,num)=>acc+num),0)

    //get sub total with suggested sell price in THB
    var sugArr = this.items.map(itemObj=>itemObj.qty*Math.ceil(itemObj.size.sugPrice*this.cs.rate))
    var sugTotal = sugArr.reduce(((acc,num)=>acc+num),0)

    //shipping cost in THB
    var sc = Math.ceil(totQty * this.uw * this.costSheet.land)
    //get potential earning
    var earn = sugTotal - subTotal - sc
    var total = sc + subTotal

    return {tot:totQty,subTot:subTotal,shippingCost:sc,earn:earn,total:total}
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.usub.unsubscribe();
    this.cssub.unsubscribe();
  }

  isObject(sth) {
    return typeof sth === 'object';
  }

  viewbig(){
    const modalRef = this.modalService.open(CarouselComponent, {centered: true});
    modalRef.componentInstance.sku = this.sku.values;

  }

  add2cart() {
    if (this.user) {
      this.adding = !this.adding;
      const p = this.getTot()
      const data = {
        name: this.pname,
        ordered: false,
        uid: this.user.uid,
        pid: this.pid,
        time: new Date(),
        items: this.items,
        subTotal: p.subTot,
        qty: p.tot,
        shippingCost:p.shippingCost,
        imageUrl:this.image,
        earn: p.earn,
        checked:true
      }

      this.afs.collection('CARTS').add(data).then(() => {
        this.adding = !this.adding;
        //open add2cart success dialog
        const modalRef = this.modalService.open(Add2cartSuccessComponent, {centered: true});
        modalRef.componentInstance.msg = this.getTot().tot;
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