import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('mail') mail!: ElementRef;
  @ViewChild('password') password!: ElementRef;

  constructor () {

  }

  login() {
    let mailValue = this.mail.nativeElement;
    let passwordValue = this.password.nativeElement;
  }
}
