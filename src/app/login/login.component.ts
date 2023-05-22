import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth, onAuthStateChanged, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { Firestore, collection, doc, setDoc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  mail = '';
  password = '';
  popUp = false;
  user$: Observable<any>;
  @Input() currentUser = '';
  guestUser = 'kLLzHS4VI6TDTL2gZUPbRzgOoID3';
  coll = collection(this.firestore, 'users');
  interval;

  ngOnInit(): void {}

  constructor(private router: Router, private auth: Auth, public firestore: Firestore, private route: ActivatedRoute) {}

  stopReload() {
    clearInterval(this.interval);
  }

  login() {
    signInWithEmailAndPassword(this.auth, this.mail, this.password).then(() => {
      onAuthStateChanged(this.auth, (user$) => {
        if (user$) {
          this.currentUser = user$.uid;
          localStorage.setItem('currentUser', this.currentUser);
          setDoc(doc(this.coll, this.currentUser), { status: 'Active' }, { merge: true }).then(() => {
            this.router.navigateByUrl('/workspace').then(() => {
              window.location.reload();
            });
          });
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


  async guestLogin() {
    await setDoc(doc(this.coll, this.guestUser), { name: 'Guest', mail: 'guest@guest.de', status: 'Active', pic: 'assets/img/profiles/profile_bw.png' }).then(() => {
      localStorage.setItem('currentUser', this.guestUser);
    });
    this.router.navigateByUrl('/workspace').then(() => {
      window.location.reload();
    });
  }


}