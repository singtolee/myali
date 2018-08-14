import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Item } from './tools/Item';
//import { reduce } from '../../node_modules/rxjs/operators';
import { map, reduce } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PassSkuService {
  itemSource = new Array<Item>();
  items = of(this.itemSource);
  

  constructor() {
  }

  addItem(i:Item){
    this.itemSource.push(i)
  }

  reset(){
    this.itemSource.length = 0;
  }
}
