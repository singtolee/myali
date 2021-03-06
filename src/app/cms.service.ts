import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

interface Cost {
  land:number;
  landDuration:string;
  minShippingCost:number;
  bankTransferDiscount:number;
  rate:number;
}


@Injectable({
  providedIn: 'root'
})
export class CmsService {

  rate:number;

  dir = 'SHIPPINGCOST';
  dirDoc = 'shippingcost';
  costSheet:Observable<Cost>;

  constructor(private afs:AngularFirestore) {
   this.costSheet = this.afs.doc<Cost>(`SHIPPINGCOST/shippingcost`).valueChanges()
   this.afs.doc<Cost>(`SHIPPINGCOST/shippingcost`).valueChanges().pipe(take(1)).subscribe(cc=>this.rate=cc.rate)

  }
}
