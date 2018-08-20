import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageZoomViewComponent } from '../image-zoom-view/image-zoom-view.component';
import { MsgComponent } from '../msg/msg.component'; 
import { AuthService } from '../auth.service';
import { CmsService } from '../cms.service';
import { Observable, Subscription } from 'rxjs';
import { map, finalize } from 'rxjs/operators'
import { Cart } from '../tools/Cart';


@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit, OnDestroy {

  paymentMethod: string = 'bank';
  user;
  sub:Subscription;
  dir = "CARTS";
  carts:any;
  cartSub:Subscription;
  isuploadingbill:boolean = false;
  checkingout:boolean = false;

  //for upload file
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  downloadURL: Observable<string>;
  billSub:Subscription;
  billUrl:string;

  isLoading:boolean = true;
  @Output() public cEvent = new EventEmitter();

  constructor(private auth: AuthService,
              private db: AngularFirestore, 
              private storage: AngularFireStorage, 
              private cms: CmsService, 
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.sub = this.auth.user.subscribe((user)=>{
      this.user = user;
      if(user){
        this.cartSub = this.loadCart2(user.uid).subscribe(c=>{
          this.carts = c;
          this.isLoading = false; 
          this.cEvent.emit(false);
        })
      }
    })
  }
  ngOnDestroy(){
    this.sub.unsubscribe()
    if(this.cartSub){
      this.cartSub.unsubscribe()
    }
    if(this.billSub){
      this.billSub.unsubscribe()
    }
  }

  startUpload(event:FileList){
    this.isuploadingbill = true
    const file = event.item(0)
    if(file.type.split('/')[0] !== 'image'){
      return
    }

    const path = `BANKTRANSFERBILLS/${new Date().getTime()}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path,file);
    this.percentage = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(()=>{
        this.downloadURL = ref.getDownloadURL()
        this.billSub = this.downloadURL.subscribe(url=>{
          this.billUrl=url;
          this.isuploadingbill = false;
        })
      })
    ).subscribe();
  }

  checkout(){
    if(this.user){
      this.checkingout = !this.checkingout;
      var cal = this.cal()
      const data = {
        billUrl:this.billUrl,
        done:false,
        uid: this.user.uid,
        time: new Date(),
        subTotal: cal.t,
        shippingCost: 0,
        cartArray:cal.arr,
        serviceFee:cal.serviceFee,
        grandTotal: cal.t + cal.serviceFee,
        status:{s1:{time:new Date(),title:'Confirmed'},s2:{time:new Date(),title:'Paid'}}
      }

      this.db.collection('ORDERS').add(data).then(() => {
        this.checkingout = !this.checkingout;
        //modal to show success msg
        const modalRef = this.modalService.open(MsgComponent,{centered:true});
        modalRef.componentInstance.msg = "Successfully Checked out, check your order history";
        for(var i=0;i<data.cartArray.length;i++){
          this.set2true(data.cartArray[i])
        }
        
      }).catch(err=>{
        //show err msg
        const modalRef = this.modalService.open(MsgComponent,{centered:true});
        modalRef.componentInstance.msg = err;
      })
    }
  }

  cal(){
    var total = 0;
    var serviceFee = 0;
    var sc = 0;
    var arr = [];
    for(var i=0;i<this.carts.length;i++){
      if(this.carts[i].data.checked){
        total = total + this.carts[i].data.subTotal
        sc = sc + this.carts[i].data.shippingCost
        serviceFee = serviceFee + this.carts[i].data.serviceCharge
        arr.push(this.carts[i].id)
      }
    }
    return {t:total,s:sc>this.cms.costSheet.minShippingCost? sc:this.cms.costSheet.minShippingCost, arr:arr, serviceFee:serviceFee}
  }
  
  cartChecked(){
    var c = this.cal()
    if(c.t>0){
      return true
    }else return false
  }

  paymentMethodChecked(){
    var c = this.cal()
    if(c.t>0){
      if(this.paymentMethod == 'cod'){
        return true
      }
      if(this.paymentMethod == 'bank'){
        if(this.downloadURL){
          return true
        }else {
          return false
        }
      }
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

  zoom(url:string){
    const modalRef = this.modalService.open(ImageZoomViewComponent,{centered:true});
    modalRef.componentInstance.image = url;

  }

}
