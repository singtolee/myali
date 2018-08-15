import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Product } from '../tools/Product';
import { PassPrdObjectService } from '../pass-prd-object.service';
import { ViewportScroller, Location } from '@angular/common'
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  id;
  showSpinner:boolean = false;
  product:Product;
  disAbleGoBack:boolean = false;


  constructor(private route: ActivatedRoute,
              private data:PassPrdObjectService,
              private db:AngularFirestore, 
              private vps:ViewportScroller, 
              private location: Location) { }

  ngOnInit() {
    this.data.currentProduct.subscribe(prd =>this.product = prd);

    if(!this.product.name){
      this.showSpinner = true;
      this.route.paramMap.subscribe((para:ParamMap)=>{
      this.id = para.get('id');
      
      this.db.collection<Product>('PRODUCTS',ref=>{
        return ref.where("pid", "==", Number(this.id)) //this.id typeof is string, so convert to number
      }).valueChanges().pipe(take(1)).subscribe((data)=>{
        this.product = data[0];
        this.showSpinner = false;
      })
        });
    }
    
  }

  isObject(sth){
    return typeof sth === 'object';
  }

  goup(){
    this.vps.scrollToPosition([0,0])
  }
  goback(){
    this.disAbleGoBack = true
    this.location.back()
  }

}
