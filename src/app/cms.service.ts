import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

interface Cost {
  land:number;
  landDuration:string;
  minShippingCost:number;
  bankTransferDiscount:number;
}


@Injectable({
  providedIn: 'root'
})
export class CmsService {

  dir = 'SHIPPINGCOST';
  dirDoc = 'shippingcost';
  costSheet:Observable<Cost>;

  constructor(private afs:AngularFirestore) {
   this.costSheet = this.afs.doc<Cost>(`SHIPPINGCOST/shippingcost`).valueChanges()

  }
}
