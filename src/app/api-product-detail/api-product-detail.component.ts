import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../tools/Product';
import { PassUrlService } from '../pass-url.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-api-product-detail',
  templateUrl: './api-product-detail.component.html',
  styleUrls: ['./api-product-detail.component.css']
})
export class ApiProductDetailComponent implements OnInit, OnDestroy {

  product:Product;
  prdSub:Subscription;

  constructor(private prdService:PassUrlService) {}

  ngOnInit() {
    this.prdSub = this.prdService.currentPrd.subscribe(p=>{
      this.product = p;
    })
  }

  ngOnDestroy(){
    this.prdSub.unsubscribe()
  }

}
