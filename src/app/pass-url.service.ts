import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassUrlService {

  private urlSource = new BehaviorSubject('');
  currentUrl = this.urlSource.asObservable();

  constructor() { }

  changeUrl(url:string){
    this.urlSource.next(url)
  }
}
