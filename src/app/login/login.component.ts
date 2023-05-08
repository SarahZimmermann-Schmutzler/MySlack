import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { Firestore, collection, doc, setDoc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  mail = '';
  password = '';
  popUp = false;
  user$: Observable<any>;
  @Input() currentUser = '';
  coll = collection(this.firestore, 'users');

  constructor (private router : Router, private auth : Auth, public firestore: Firestore) {}

  login() {  
  signInWithEmailAndPassword(this.auth, this.mail, this.password).then(() => {
        localStorage.setItem('token','true');
        onAuthStateChanged(this.auth, (user$) => {
          if(user$) {
            this.currentUser = user$.uid;
            console.log(this.currentUser);
            setDoc(doc(this.coll, this.currentUser), {status: 'Active'}, {merge: true});
            this.router.navigateByUrl('/workspace/'+ this.currentUser);
          }
        })
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

    guestLogin() {
      setDoc(doc(this.coll, 'kLLzHS4VI6TDTL2gZUPbRzgOoID3'), 
      {name: 'Guest', mail: 'guest@guest.de', status: 'Active'}),
      this.router.navigateByUrl('/workspace/'+ 'kLLzHS4VI6TDTL2gZUPbRzgOoID3');
    }
}
