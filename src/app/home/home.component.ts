import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Product } from '../tools/Product';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators'
import { PassPrdObjectService } from '../pass-prd-object.service';
import { Store, Select } from '@ngxs/store';
import { PrdState } from './../state/prd.state'
import { LoadPrd, LoadMore } from './../actions/prd.actions';
import { ScrollPositionRestoreService } from '../scroll-position-restore.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewChecked {

  isLoading:boolean = false;
  showSpinner:boolean = true;

  homePagePrds:Observable<Product[]>;

  constructor(private store:Store, 
              private data:PassPrdObjectService,
              private spr:ScrollPositionRestoreService,
              private vps:ViewportScroller
            ) {}

  ngOnInit() {
    this.homePagePrds = this.store.select(state=>state.mDB.prds.get('home'));
    this.store.select(state=>state.mDB.prds.get('home')).pipe(take(1)).subscribe(b=>{
      if(b){
        this.showSpinner=false
      }else {
        this.store.dispatch(new LoadPrd({key:'isHomePagePrd',cate:'home'})).subscribe(() => this.showSpinner = false);
      }
    })

  }

  ngAfterViewChecked(){
    this.vps.scrollToPosition(this.spr.getPosition()?this.spr.getPosition():[0,0])
  }

  loadmore(){
    this.spr.setPosition(this.vps.getScrollPosition())
    this.isLoading = true
    this.store.dispatch(new LoadMore({key:'isHomePagePrd',cate:'home'})).subscribe(() => this.isLoading = false);
  }

  passPrd(prd:Product){
    this.data.changeProduct(prd);
    this.spr.setPosition(this.vps.getScrollPosition())
  }

}
