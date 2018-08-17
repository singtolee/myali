import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Product } from '../tools/Product';
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-api-product-detail',
  templateUrl: './api-product-detail.component.html',
  styleUrls: ['./api-product-detail.component.css']
})
export class ApiProductDetailComponent implements OnInit {

  @Input() public prdID;

  public product:any;
  dir = "APIPRODUCTS";

  constructor(private db:AngularFirestore) {}

  ngOnInit() {
    this.db.collection<Product>(this.dir,ref=>{
      return ref.where("pid", "==", this.prdID) //this.id typeof is string, so convert to number
    }).valueChanges().pipe(take(1)).subscribe((data)=>{
      this.product = data[0];
    })
    
  }

}
