import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollPositionRestoreService {

  private position;

  constructor() {}

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
