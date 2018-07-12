import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
interface Bank {
  title: string;
  imgUrl:string;
  account:string;
}

@Component({
  selector: 'app-fectch-bank-account',
  templateUrl: './fectch-bank-account.component.html',
  styleUrls: ['./fectch-bank-account.component.css']
})
export class FectchBankAccountComponent implements OnInit {
  dir = "BANKACCOUNTS";
  banks: Observable<Bank[]>;
  private banksCol: AngularFirestoreCollection<Bank>;

  constructor(private db: AngularFirestore) {
  }

  ngOnInit() {
    this.banksCol = this.db.collection<Bank>(this.dir);
    this.banks = this.banksCol.valueChanges();
  }

}
