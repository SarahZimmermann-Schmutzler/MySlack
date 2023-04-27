import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user = new User();
  disabled = true;
  popUp = false;
  coll = collection(this.firestore, 'users');

  ngOnInit(): void {
    setInterval(() => {
      if(this.user.name && this.user.mail && this.user.password) {
        this.disabled = false;
      }
    }, 1000); 
  }

  constructor(
    public firestore: Firestore,
    private router: Router) {}
  
    saveUser() {
    // console.log('current user is', this.user);
    addDoc(this.coll, this.user.toJSON()).then((result:any) => {
      // console.log('Adding user finished', result);
    });
    this.clearFields();
    this.disabled = true;
    this.popUp = true;
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000);
  }

  clearFields() {
    this.user.name = '';
    this.user.mail = '';
    this.user.password = '';
  }
}
