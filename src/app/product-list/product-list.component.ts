import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators'
import { Product } from '../tools/Product';
import { PassPrdObjectService } from '../pass-prd-object.service';

import { Store, Select } from '@ngxs/store';
import { PrdState } from './../state/prd.state'
import { LoadPrd, LoadMore } from './../actions/prd.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
prds: Observable<Product[]>;
category;
isLoading:boolean = true;
constructor(private route: ActivatedRoute, private data: PassPrdObjectService,private store:Store) {
}
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

  loadmore(){
    this.isLoading = true
    console.log(this.isLoading)
    this.store.dispatch(new LoadMore({key:'keyword',cate:this.category})).subscribe(() => this.isLoading = false);
  }

  passPrd(prd:Product){
    this.data.changeProduct(prd);
  }

}
