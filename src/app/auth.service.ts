import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

interface User {
  uid:string;
  email?:string;
  photoURL?:string;
  displayName?:string;
}

interface Address {
  consignee:string;
  phone:string;
  postCode:string;
  city:string;
  address:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:Observable<User>;
  address:Observable<Address>;
  cartCount:Observable<number>;

  constructor(private afAuth: AngularFireAuth,private afs: AngularFirestore,public router: Router) {
    this.user = this.afAuth.authState.pipe(switchMap(user=>{
      if(user){
        this.cartCount = this.getCount(user.uid)
        return this.afs.doc<User>(`USERS/${user.uid}`).valueChanges()
      }else{
        return of(null)
      }
    }))

    this.address = this.afAuth.authState.pipe(switchMap(user=>{
      if(user){
        return this.afs.doc<Address>(`ADDRESSES/${user.uid}`).valueChanges()
      }else{
        return of(null)
      }
    }))

  }

  googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  facebookLogin(){
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.oAuthLogin(provider);
  }

  emailLogin(e,p){
    return this.afAuth.auth.signInWithEmailAndPassword(e,p)
  }

  resetpassword(e){
    return this.afAuth.auth.sendPasswordResetEmail(e)
  }

  signup(e,p){
    return this.afAuth.auth.createUserWithEmailAndPassword(e,p)
  }

  private oAuthLogin(provider){
    return this.afAuth.auth.signInWithPopup(provider)
    .then((credential)=>{
      this.updateUserData(credential.user)
    })
  }

  public updateUserData(user){
    const userRef:AngularFirestoreDocument<any> = this.afs.doc(`USERS/${user.uid}`);

    const data :User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    return userRef.set(data, {merge:true})
  }

  signOut(){
    this.afAuth.auth.signOut().then(()=>{
      this.router.navigate(['/home']);
    })

  }

  getCount(uid:string){
    return this.afs.collection('CARTS',ref=>{
      return ref.where('uid','==',uid)
      .where('ordered','==',false)
    }).valueChanges().pipe(map(a=>{return a.length}))
  }
}
