import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { PayLoad } from './tools/pay-load'
import { PayLoad2 } from './tools/pay-load2'
import { Product } from './tools/Product';

@Injectable({
  providedIn: 'root'
})
export class LoadService {
  dir = "PRODUCTS";
  constructor(private afs:AngularFirestore) { }

  loadprd(p:PayLoad2){
    return this.afs.collection<Product>(this.dir, ref => {
      return ref.where(p.key, "==", p.cate)
      .orderBy("score", "desc")
      .orderBy("comment_count", "desc")
      .limit(40)
    });
  }

  loadmore(p:PayLoad){
    return this.afs.collection<Product>(this.dir, ref => {
      return ref.where(p.key, "==", p.cate)
      .orderBy("score", "desc")
      .orderBy("comment_count", "desc")
      .startAfter(p.doc)
      .limit(40)
    });

  }
}
