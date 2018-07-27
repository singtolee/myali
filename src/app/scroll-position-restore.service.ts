import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollPositionRestoreService {

  private position;
  private needResetPosition:boolean = false;

  constructor() {}


  needReset(){
    this.needResetPosition = true
  }

  noNeedReset(){
    this.needResetPosition = false
  }

  isNeed(){
    return this.needResetPosition
  }

  getPosition(){
    return this.position
  }

  setPosition(p){
    this.position = p
  }

  resetPosition(){
    this.position = [0,0]
  }




}
