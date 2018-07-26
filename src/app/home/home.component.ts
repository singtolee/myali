import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { Product } from '../tools/Product';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators'
import { PassPrdObjectService } from '../pass-prd-object.service';
import { Store } from '@ngxs/store';
import { LoadPrd, LoadMore, StartSpinner, StopSpinner } from './../actions/prd.actions';
import { ScrollPositionRestoreService } from '../scroll-position-restore.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewChecked {
  spin:boolean
  spinSub:Subscription
  isDone:Observable<boolean>

  homePagePrds:Observable<Product[]>;

  constructor(private store:Store, 
              private data:PassPrdObjectService,
              private spr:ScrollPositionRestoreService,
              private vps:ViewportScroller
            ) {}

  ngOnInit() {
    this.spinSub = this.store.select(state=>state.mDB.isLoading).subscribe(b=>this.spin=b)
    this.isDone = this.store.select(state=>state.mDB.isDone.get('home'));
    this.homePagePrds = this.store.select(state=>state.mDB.prds.get('home'));
    this.store.select(state=>state.mDB.prds.get('home')).pipe(take(1)).subscribe(b=>{
      if(b){
        this.store.dispatch(new StopSpinner)
      }else{
        this.store.dispatch(new LoadPrd({key:'isHomePagePrd',cate:'home'}))
      }
    })

  }

  ngOnDestroy(){
    this.spinSub.unsubscribe()
  }

  ngAfterViewChecked(){
    this.vps.scrollToPosition(this.spr.getPosition()?this.spr.getPosition():[0,0])
  }

  loadmore(){
    this.spr.setPosition(this.vps.getScrollPosition())
    this.store.dispatch(new StartSpinner)
    this.store.dispatch(new LoadMore({key:'isHomePagePrd',cate:'home'}))
  }

  passPrd(prd:Product){
    this.data.changeProduct(prd);
    this.spr.setPosition(this.vps.getScrollPosition())
  }

}
