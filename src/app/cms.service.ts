import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

interface Cost {
  sea:number;
  seaDuration:string;
  land:number;
  landDuration:string;
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
