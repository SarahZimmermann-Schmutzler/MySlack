import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { User } from 'src/models/user.class';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DirectMessages } from 'src/models/directmessages.class';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user = new User();
  coll = collection(this.firestore, 'users');
  disabled = true;
  popUp = false;
  name = '';
  mail = '';
  password = '';
  user$: Observable<any>;
  currentUser = '';
  

  ngOnInit(): void {
    setInterval(() => {
      if(this.user.name && this.mail && this.password) {
        this.disabled = false;
      }
    }, 1000);
  }

  constructor(private router: Router, private auth : Auth, public firestore: Firestore) {}
  
    registerUser() {
    console.log(this.mail, this.password)
    createUserWithEmailAndPassword(this.auth, this.mail, this.password).then(() => {
      onAuthStateChanged(this.auth, (user$) => {
        if(user$) {
          this.currentUser = user$.uid;
          // console.log(this.currentUser);
          setDoc(doc(this.coll, this.currentUser), this.user.toJSON(), {merge: true});
          
        }
      });
    this.clearFields();
    this.disabled = true;
    this.popUp = true;
    setTimeout(() => {
    this.router.navigate(['/']);
    }, 3000);
    });
  }

  

  clearFields() {
    this.name = '';
    this.mail = '';
    this.password = '';
  }
}
