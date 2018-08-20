import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { take } from 'rxjs/operators';

interface Cost {
  land:number;
  landCube:number;
  landDuration:string;
  minShippingCost:number;
  bankTransferDiscount:number;
  rate:number;
  scr:number;
}


@Injectable({
  providedIn: 'root'
})
export class CmsService {

  dir = 'SHIPPINGCOST';
  dirDoc = 'shippingcost';
  costSheet:Cost;

  constructor(private afs:AngularFirestore) {
   this.afs.doc<Cost>(`SHIPPINGCOST/shippingcost`).valueChanges().pipe(take(1)).subscribe(cc=>this.costSheet=cc)

  }
}
