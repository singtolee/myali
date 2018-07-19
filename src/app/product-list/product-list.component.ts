import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, ParamMap, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators'
import { Product } from '../tools/Product';
import { PassPrdObjectService } from '../pass-prd-object.service';

import { Store, Select } from '@ngxs/store';
import { PrdState } from './../state/prd.state'
import { LoadPrd, LoadMore } from './../actions/prd.actions';

import { ScrollPositionRestoreService } from '../scroll-position-restore.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewChecked {
prds: Observable<Product[]>;
category;
isLoading:boolean = true;
constructor(private route: ActivatedRoute, 
            private data: PassPrdObjectService,
            private store:Store,
            private spr:ScrollPositionRestoreService,
            private vps:ViewportScroller
          ) {}
  ngOnInit() {
    this.route.paramMap.subscribe((para: ParamMap) => {
      this.category = para.get('category');
      this.prds = this.store.select(state=>state.mDB.prds.get(this.category))
      this.store.select(state=>state.mDB.prds.get(this.category)).pipe(take(1)).subscribe(b=>{
        if(b){
          this.isLoading=false
        }else {
          this.store.dispatch(new LoadPrd({key:'keyword',cate:this.category})).subscribe(() => this.isLoading = false);
        }
      })
    });
  }

  ngAfterViewChecked(){
    this.vps.scrollToPosition(this.spr.getPosition()?this.spr.getPosition():[0,0])
  }

  loadmore(){
    this.spr.setPosition(this.vps.getScrollPosition())
    this.isLoading = true
    this.store.dispatch(new LoadMore({key:'keyword',cate:this.category})).subscribe(() => this.isLoading = false);
  }

  passPrd(prd:Product){
    this.data.changeProduct(prd);
    this.spr.setPosition(this.vps.getScrollPosition())
  }

}
