import { Component, OnInit } from '@angular/core';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit{
  disabled = true;
  popUp = false;
  mail = '';

  ngOnInit(): void {
    setInterval(() => {
      if(this.mail) {
        this.disabled = false;
      }
    }, 1000);
  }

  constructor(private router: Router, private auth : Auth) {}

  sendMail() {
    sendPasswordResetEmail(this.auth, this.mail).then(() => {
      this.clearFields();
      this.disabled = true;
      this.popUp = true;
      // setTimeout(() => {
      // this.router.navigate(['/']);
      // }, 3000);
    })
  }

  clearFields() {
    this.mail = '';
  }
}
