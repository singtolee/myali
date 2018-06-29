import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './tools/Product';

@Injectable({
  providedIn: 'root'
})
export class PassPrdObjectService {

  private productSource = new BehaviorSubject(new Product());
  currentProduct = this.productSource.asObservable();

  constructor() { }

  changeProduct(product:Product){
    this.productSource.next(product)
  }
}
