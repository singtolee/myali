import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Item } from './tools/Item';

@Injectable({
  providedIn: 'root'
})
export class PassSkuService {
  itemSource = new Array<Item>();
  items = of(this.itemSource);
  subAndQty = of(this.sub());
  

  constructor() {
  }

  addItem(i:Item){
    this.itemSource.push(i)
  }

  reset(){
    this.itemSource.length = 0;
  }

  sub(){
    var su = 0
    var quantity = 0
    for(const i of this.itemSource){
      quantity = quantity + i.qty
      su = su + i.qty * Number(i.size.price)
    }
    return {subTotal: su,qty:quantity}
  }
}
