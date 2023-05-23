import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { User } from 'src/models/user.class';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user = new User();
  coll = collection(this.firestore, 'users');
  popUp = false;
  name = '';
  mail = '';
  password = '';
  user$: Observable<any>;
  currentUser = '';
  form;

  ngOnInit(): void {
    setInterval(() => {
      this.form = new FormGroup({
        password: new FormControl(this.password, [Validators.minLength(8), Validators.required]),
        name: new FormControl(this.user.name, [Validators.pattern('[A-Za-z ]+'), Validators.required]),
        mail: new FormControl(this.mail, [Validators.email, Validators.required])
      })
    }, 1000);
    
    // setInterval(() => {
    //   if(this.user.name && this.mail && this.password) {
    //     this.disabled = false;
    //   }
    // }, 1000);
  }

  constructor(private router: Router, private auth : Auth, public firestore: Firestore) {}
  
    registerUser() {
    console.log(this.mail, this.password)
    createUserWithEmailAndPassword(this.auth, this.mail, this.password).then(() => {
      onAuthStateChanged(this.auth, (user$) => {
        if(user$) {
          this.currentUser = user$.uid;
          // console.log(this.currentUser);
          this.user.pic = '' || 'assets/img/profiles/profile_bw.png';
          setDoc(doc(this.coll, this.currentUser), this.user.toJSON(), {merge: true});
          
        }
      });
    this.clearFields();
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
