import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Product } from '../tools/Product';
import { PassPrdObjectService } from '../pass-prd-object.service';
import { Order } from '../tools/Order';
import { Item } from '../tools/Item';
import { fadeInContent } from '@angular/material';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  id; //use this id to get Product
  showSpinner:boolean = false;
  product:Product;
  order:Order;
  item:Item;


  constructor(private route: ActivatedRoute,private data:PassPrdObjectService,private db:AngularFirestore) { }

  ngOnInit() {
    this.data.currentProduct.subscribe(prd =>this.product = prd);

    if(!this.product.name){
      this.showSpinner = true;
      this.route.paramMap.subscribe((para:ParamMap)=>{
      this.id = para.get('id');
      //console.log(this.id)
      
      this.db.collection<Product>('PRODUCTS',ref=>{
        return ref.where("pid", "==", Number(this.id)) //this.id typeof is string, so convert to number
      }).valueChanges().subscribe((data)=>{
        this.product = data[0];
        this.showSpinner = false;
      })
        });
    }
    
  }

  isObject(sth){
    return typeof sth === 'object';
  }

  toNum(str){

    if(typeof str === 'string'){
      var nums = str.split(/\-+/);
      if(nums.length==1){
        return Math.ceil(Number(nums[0])*6) + 'THB';
      }else {
        return Math.ceil(Number(nums[0])*6) + '~' + Math.ceil(Number(nums[1])*6) + ' THB';
      }
      
    }
    return Math.ceil(str*6) + ' THB';
  }

}
