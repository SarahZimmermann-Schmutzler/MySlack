import { Component } from '@angular/core';
import { Auth, updateEmail } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent {

  constructor (private router : Router, private auth : Auth) {}

  resetPassword() {
    updateEmail
  }

}
