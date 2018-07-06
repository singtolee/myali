import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit, OnDestroy {
  user;
  usub: Subscription;
  asub:Subscription;
  currentJustify = 'fill';

  constructor(public auth: AuthService,private db:AngularFirestore) {
   }

  ngOnInit() {
  }

  ngOnDestroy(){
  }

}
