import { Component, OnInit } from '@angular/core';
import { Auth, confirmPasswordReset, updateEmail, verifyPasswordResetCode } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  newpasswordOne = '';
  newpasswordTwo = '';
  disabled = true;
  popUp = false;
  oobCode = '';

  ngOnInit(): void {
    setInterval(() => {
      if (this.newpasswordOne && this.newpasswordTwo && this.newpasswordOne == this.newpasswordTwo) {
        this.disabled = false;
      }
    }, 1000);
  }

  constructor(private router: Router, private auth: Auth) { }

  resetPassword() {
    const urlParams = new URL(window.location.toLocaleString()).searchParams;
    let oobCode = urlParams.get('oobCode');
    console.log(oobCode);
    confirmPasswordReset(this.auth, oobCode, this.newpasswordOne). then(() => {
      this.clearFields();
      this.disabled = true;
      this.popUp = true;
      setTimeout(() => {
        this.router.navigate(['/']);
        }, 3000);
    }) .catch(() => {
      console.log('Invalid code')
    });
  }

  
  clearFields() {
    this.newpasswordOne = '';
    this.newpasswordTwo = '';
  }
}
