import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  disabled = true;
  popUp = false;
  name = '';
  mail = '';
  password = '';

  ngOnInit(): void {
    setInterval(() => {
      if(this.name && this.mail && this.password) {
        this.disabled = false;
      }
    }, 1000);
  }

  constructor(private router: Router, private auth : Auth) {}
  
    registerUser() {
    console.log(this.mail, this.password)
    createUserWithEmailAndPassword(this.auth, this.mail, this.password).then(() => {
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

// user = new User();
//   disabled = true;
//   popUp = false;
//   coll = collection(this.firestore, 'users');

//   ngOnInit(): void {
//     setInterval(() => {
//       if(this.user.name && this.user.mail && this.user.password) {
//         this.disabled = false;
//       }
//     }, 1000); 
//   }

//   constructor(
//     public firestore: Firestore,
//     private router: Router) {}
  
//     registerUser() {
//     // console.log('current user is', this.user);
//     addDoc(this.coll, this.user.toJSON()).then((result:any) => {
//       // console.log('Adding user finished', result);
//     });
//     this.clearFields();
//     this.disabled = true;
//     this.popUp = true;
//     setTimeout(() => {
//       this.router.navigate(['/']);
//     }, 3000);
//   }

//   clearFields() {
//     this.user.name = '';
//     this.user.mail = '';
//     this.user.password = '';
//   }
// }
