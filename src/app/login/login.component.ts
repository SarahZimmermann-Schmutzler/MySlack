import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  mail = '';
  password = '';
  popUp = false;

  constructor (private router : Router, private auth : Auth) {}

  login() {  
  signInWithEmailAndPassword(this.auth, this.mail, this.password).then(() => {
        localStorage.setItem('token','true');
        this.router.navigate(['/workspace']);
      }, () => {
        console.log('Fehlgeschlagen')
        this.popUp = true;
        setTimeout(() => {
          this.mail = '';
          this.password = '';
          this.popUp = false;
          }, 3000); 
        })
    }
}
