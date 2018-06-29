import { Component, OnInit } from '@angular/core';
import { Product } from '../tools/Product';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators'
import { PassPrdObjectService } from '../pass-prd-object.service';
import { Store, Select } from '@ngxs/store';
import { PrdState } from './../state/prd.state'
import { LoadPrd, LoadMore } from './../actions/prd.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoading:boolean = false;
  showSpinner:boolean = true;

  homePagePrds:Observable<Product[]>;

  constructor(private store:Store, private data:PassPrdObjectService) {}

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

  loadmore(){
    this.isLoading = true
    this.store.dispatch(new LoadMore({key:'isHomePagePrd',cate:'home'})).subscribe(() => this.isLoading = false);
  }

  toNum(str){

    if(typeof str === 'string'){
      var nums = str.split(/\-+/);
      return Math.ceil(Number(nums[0])*6) + '~' + Math.ceil(Number(nums[1])*6) + ' THB';
    }
    return Math.ceil(str*6) + ' THB';
  }

  passPrd(prd:Product){
    this.data.changeProduct(prd);
  }

}
