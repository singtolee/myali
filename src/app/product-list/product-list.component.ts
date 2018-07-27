import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators'
import { Product } from '../tools/Product';
import { PassPrdObjectService } from '../pass-prd-object.service';

import { Store } from '@ngxs/store';
import { LoadPrd, LoadMore, StartSpinner, StopSpinner } from './../actions/prd.actions';

import { ScrollPositionRestoreService } from '../scroll-position-restore.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy, AfterViewChecked {
prds: Observable<Product[]>;
category;
spin:boolean
spinSub:Subscription
isDone:Observable<boolean>
constructor(private route: ActivatedRoute, 
            private data: PassPrdObjectService,
            private store:Store,
            private spr:ScrollPositionRestoreService,
            private vps:ViewportScroller
          ) {}
  ngOnInit() {
    this.store.dispatch(new StartSpinner)
    this.route.paramMap.subscribe((para: ParamMap) => {
      this.category = para.get('category');
      this.spinSub = this.store.select(state=>state.mDB.isLoading).subscribe(b=>this.spin=b)
      this.isDone = this.store.select(state=>state.mDB.isDone.get(this.category))
      this.prds = this.store.select(state=>state.mDB.prds.get(this.category))
      this.store.select(state=>state.mDB.prds.get(this.category)).pipe(take(1)).subscribe(b=>{
        if(b){
          this.store.dispatch(new StopSpinner)
        }else {
          this.store.dispatch(new LoadPrd({key:'keyword',cate:this.category}))
        }
      })
    });
  }

  ngOnDestroy(){
    this.spinSub.unsubscribe()
  }

  ngAfterViewChecked(){
    if(this.spr.isNeed()){
      this.vps.scrollToPosition(this.spr.getPosition())
      this.spr.noNeedReset()
    }
    //this.vps.scrollToPosition(this.spr.getPosition()?this.spr.getPosition():[0,0])
  }

  loadmore(){
    //this.spr.setPosition(this.vps.getScrollPosition())
    this.store.dispatch(new StartSpinner)
    this.store.dispatch(new LoadMore({key:'keyword',cate:this.category}))
  }

  passPrd(prd:Product){
    this.data.changeProduct(prd);
    this.spr.setPosition(this.vps.getScrollPosition())
    this.spr.needReset();
  }

}
