import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Product } from './tools/Product';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlsHistoryService {
  private prdSource = new Array<Product>();
  public prds = of(this.prdSource);

  constructor() { }

  addItem(i:Product){
    this.prdSource.push(i)
  }
}
