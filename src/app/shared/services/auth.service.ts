import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router : Router, private auth : Auth) { }

  //login method
  // login(mail, password) {
  //   this.auth.signInWithEmailAndPassword(mail, password).then(() => {
  //     localStorage.setItem('token','true');
  //   })
  //   signInWithEmailAndPassword(this.auth, mail, password).then(() => {
  //     localStorage.setItem('token','true');
  //   })
  // }

  //register method
  // register(mail, password) {
  //   this.auth.createUserWithEmailAndPassword(mail, password)
  //   createUserWithEmailAndPassword(this.auth, mail, password)
  // }

  //signout method
  // logout() {
  //   signOut(this.auth);
  // }
}
