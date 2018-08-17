import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassUrlService {

  private urlSource = new BehaviorSubject('');
  currentUrl = this.urlSource.asObservable();

  private pidSource = new BehaviorSubject<number>(0)
  currentPid = this.pidSource.asObservable();

  constructor() { }

  changeUrl(url:string){
    this.urlSource.next(url)
  }

  changePid(pid:number){
    this.pidSource.next(pid)
  }
}
