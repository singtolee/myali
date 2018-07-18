import { Component, Inject, OnInit, Input, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../auth.service';
import { CmsService } from '../cms.service';
import { PassSkuService } from '../pass-sku.service';
import { Subscription } from 'rxjs';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from '../carousel/carousel.component';

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
  sub: Subscription;
  usub: Subscription;
  cssub:Subscription;
  costSheet;
  adding:boolean=false;

  constructor(private auth: AuthService, private psku: PassSkuService, private afs: AngularFirestore, public dialog: MatDialog, private cs: CmsService, private modalService: NgbModal) { }

  ngOnInit() {
    this.psku.reset();
    this.cssub = this.cs.costSheet.subscribe(cs=>this.costSheet=cs)
    

    this.sub = this.psku.items.subscribe(i => this.items = i);
    this.usub = this.auth.user.subscribe(u => this.user = u);
  }
  skuType(){
    if(this.sku.length == 2){
      return 'typeone'
    }
    if(this.sku.length == 1){
      if(this.isObject(this.sku[0])){
        return 'typetwo'
      }else{
        return 'typethree'
      }
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
          sc: tot * this.uw * this.costSheet.land,
          price: tot * this.str2prc(this.info[j].price), 
          cp: this.str2prc(this.info[j].price),
          sugPrice: Math.ceil(this.str2prc(this.info[j].price)*2/100)*100-1, }
      }
    }
    return p
  }

  str2prc(a) {
    if (typeof (a) == 'number') {
      return Math.ceil(a * 6)
    }
    if (typeof (a) == 'string') {
      return Math.ceil(Number(a) * 6)
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
  }

  isObject(sth) {
    return typeof sth === 'object';
  }

  viewbig(){
    console.log(this.sku[0].values)
    const modalRef = this.modalService.open(CarouselComponent, {centered: true});
    modalRef.componentInstance.sku = this.sku[0].values;

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
        earn:p.qty*(p.sugPrice-p.cp-this.uw*this.costSheet.land),
        checked:true
      }

      this.afs.collection('CARTS').add(data).then(() => {
        this.adding = !this.adding;
        this.dialog.open(Add2CartDialog,{
          width:'250px',
          data:{qty:this.getTot()}
        })
        this.psku.reset()
      }).catch((err)=>{
        this.dialog.open(LoginFirstDialog, {
          width: '250px',
          data:{msg:err}
        });
      })
      
    } else {
      this.dialog.open(LoginFirstDialog, {
        width: '250px',
        data:{msg:'Please login first.'}
      });
    }
  }

}


@Component({
  selector: 'add2cart',
  templateUrl: 'add2cart.html',
  styleUrls: ['./add2cart.css']
})
export class Add2CartDialog {

  constructor(
    public dialogRef: MatDialogRef<Add2CartDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'loginfirst',
  templateUrl: 'loginfirst.html',
  styleUrls: ['./loginfirst.css']
})
export class LoginFirstDialog {

  constructor(
    public dialogRef: MatDialogRef<LoginFirstDialog>,@Inject(MAT_DIALOG_DATA) public data:any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}