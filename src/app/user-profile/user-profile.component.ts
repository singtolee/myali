import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
    usub: Subscription;
    asub:Subscription;
    isEditing:boolean = false;

  constructor(public auth:AuthService) {}

  ngOnInit() {
  }

  ngOnDestroy(){

  }

  logout(){
    this.auth.signOut()
  }

}
