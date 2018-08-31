import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './tools/Product';


@Injectable({
  providedIn: 'root'
})
export class PassUrlService {

  private urlSource = new BehaviorSubject('');
  currentUrl = this.urlSource.asObservable();

  private prdSource = new BehaviorSubject(new Product())
  currentPrd = this.prdSource.asObservable();

  constructor() { }

  changeUrl(url:string){
    this.urlSource.next(url)
  }

  changePrd(prd:Product){
    this.prdSource.next(prd)
  }
}
