import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Item } from './tools/Item';

@Injectable({
  providedIn: 'root'
})
export class PassSkuService {
  itemSource = new Array<Item>();
  items = of(this.itemSource)
  

  constructor() {
  }

  addItem(i:Item){
    this.itemSource.push(i)
  }

  reset(){
    this.itemSource.length = 0;
  }

  findItem(i:Item){
    this.itemSource.findIndex(ele=>{
      return ele.sku == i.sku && ele.size == i.size
    })
  }
}
