import { Component, Inject, OnInit, Input, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../auth.service';
import { PassSkuService } from '../pass-sku.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CalculatorComponent implements OnInit, OnDestroy {

  @Input() public sku;
  @Input() public pid;
  @Input() public info;
  user;
  items;
  sub: Subscription;
  usub: Subscription;

  constructor(private auth: AuthService, private psku: PassSkuService, private afs: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit() {
    this.psku.reset();
    this.sub = this.psku.items.subscribe(i => this.items = i);
    this.usub = this.auth.user.subscribe(u => this.user = u);
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
        p = { qty: tot, price: tot * this.str2prc(this.info[j].price), cp: this.str2prc(this.info[j].price) }
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
  }

  isObject(sth) {
    return typeof sth === 'object';
  }

  buynow() {
    if (this.user) {
     //add to cart and go to user page to checkout
    } else {
      this.dialog.open(LoginFirstDialog, {
        width: '250px',
        data:{msg:'Please login first.'}
      });

    }

  }
  add2cart() {
    if (this.user) {
      const p = this.pc()
      const data = {
        uid: this.user.uid,
        pid: this.pid,
        time: new Date(),
        items: this.items,
        price: p.cp,
        total: p.price,
        qty: p.qty
        
      }
      this.afs.collection('CARTS').add(data).then(() => {
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