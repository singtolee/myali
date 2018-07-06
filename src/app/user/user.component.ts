import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(public auth: AuthService, public dialog: MatDialog) { }

  ngOnInit() { }
  openDialog(): void {
    let dialogRef = this.dialog.open(LoginDialog, {
      width: '450px',
      height: '600px',
    });
    dialogRef.afterClosed().subscribe();
  }
}

@Component({
  selector: 'login-dialog',
  templateUrl: 'login-dialog.html',
  styleUrls: ['./login-dialog.css']
})
export class LoginDialog {

  currentJustify = 'fill';
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



  constructor(public dialogRef: MatDialogRef<LoginDialog>, public sAuth: AuthService) { }
  fblogin() {
    this.sAuth.facebookLogin();
    this.dialogRef.close();
  }
  googlelogin() {
    this.sAuth.googleLogin();
    this.dialogRef.close();
  }

  loginWithEmail(formData) {
    if (formData.valid) {
      this.sAuth.emailLogin(formData.value.email, formData.value.password).then((cred) => {
        this.sAuth.updateUserData(cred.user);
        this.dialogRef.close();
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

  onNoClick(): void {
    this.dialogRef.close();
  }
}
