import { Component, OnInit } from '@angular/core';
import { Auth, confirmPasswordReset, updateEmail, verifyPasswordResetCode } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private router: Router, private auth: Auth, private route: ActivatedRoute) { }

  async resetPassword() {
    
    this.route.params.subscribe((params) => {
      this.oobCode = params['oobCode'];
      console.log(this.oobCode)
    })

    // const params = new URLSearchParams(window.location.pathname);
    // const code = params.get('oobCode')
    // const email = await verifyPasswordResetCode(this.auth, code)
    // console.log(email);
    // verifyPasswordResetCode(this.auth, code)
    // confirmPasswordReset(this.auth, oobCode, this.newpasswordOne)
  }

}
