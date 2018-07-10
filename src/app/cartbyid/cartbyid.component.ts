import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Cart } from '../tools/Cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cartbyid',
  templateUrl: './cartbyid.component.html',
  styleUrls: ['./cartbyid.component.css']
})
export class CartbyidComponent implements OnInit {
  @Input() public id;
  dir = 'CARTS'
  itemDoc: AngularFirestoreDocument<Cart>
  cart:Observable<Cart>

  constructor(private db:AngularFirestore) {}

  ngOnInit() {
    this.itemDoc = this.db.doc(this.dir + '/' + this.id)
    this.cart = this.itemDoc.valueChanges()
  }

}
