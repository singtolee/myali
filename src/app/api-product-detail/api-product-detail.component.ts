import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Product } from '../tools/Product';
import { take } from 'rxjs/operators'
import { PassUrlService } from '../pass-url.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-api-product-detail',
  templateUrl: './api-product-detail.component.html',
  styleUrls: ['./api-product-detail.component.css']
})
export class ApiProductDetailComponent implements OnInit, OnDestroy {

  pid:number;
  pidSub:Subscription;

  public product:any;
  dir = "APIPRODUCTS";

  constructor(private db:AngularFirestore, private pidService:PassUrlService) {}

  ngOnInit() {
    this.pidSub = this.pidService.currentPid.subscribe(p=>{
      this.pid = p;
      this.fetchPrd(this.pid)
    })
  }

  ngOnDestroy(){
    this.pidSub.unsubscribe()
  }

  fetchPrd(pid){
    this.db.collection<Product>(this.dir,ref=>{
      return ref.where("pid", "==", pid) //this.id typeof is string, so convert to number
    }).valueChanges().pipe(take(1)).subscribe((data)=>{
      this.product = data[0];
    })
  }

}
