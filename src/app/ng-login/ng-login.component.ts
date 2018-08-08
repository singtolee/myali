import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ng-login',
  templateUrl: './ng-login.component.html',
  styleUrls: ['./ng-login.component.css']
})
export class NgLoginComponent implements OnInit {

  isCollapsed = true;

  //for login
  email;
  password;
  //reset password
  emailp;
  //for sign up
  emails;
  passwords;
  loginerror;

  resetSuccessMsg;
  resetError;

  signupSuccessMsg;
  signupError

  constructor(public sAuth: AuthService, public activeModal: NgbActiveModal) { }

  closeAlert(){
    this.loginerror = false
  }

  closeRSAlert(){
    this.resetError = false
  }

  closeSCAlert(){
    this.resetSuccessMsg = false
  }

  closeSingupErrorAlert(){
    this.signupError = false
  }

  closeSignupSuccessAlert(){
    this.signupSuccessMsg = false
    this.activeModal.close()
  }

  ngOnInit() {
  }

  fblogin() {
    this.sAuth.facebookLogin();
    this.activeModal.close();
  }
  googlelogin() {
    this.sAuth.googleLogin();
    this.activeModal.close();
  }

  loginWithEmail(formData) {
    if (formData.valid) {
      this.sAuth.emailLogin(formData.value.email, formData.value.password).then((cred) => {
        this.sAuth.updateUserData(cred.user);
        this.activeModal.close();
      }).catch((err) => {
        this.loginerror = err
      })
    }
  }

  resetpassword(emailData) {
    if (emailData.valid) {
      this.sAuth.resetpassword(emailData.value.emailp).then(() => {
        this.resetError = "";
        this.resetSuccessMsg = "Check your inbox(Spam or Trash) to reset password."
      }).catch(err => {
        this.resetError = err;
      })
    }
  }

  signup(signupData) {
    if (signupData.valid) {
      this.sAuth.signup(signupData.value.emails, signupData.value.passwords).then((cred) => {
        this.sAuth.updateUserData(cred.user);
        this.signupError = ""
        this.signupSuccessMsg = "Account created."
      }).catch(err => {
        this.signupError = err
      })
    }
  }

}
