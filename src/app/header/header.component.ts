import { Component, Input, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { Firestore, collection, collectionData, doc, docData, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Input() logoMode = true;
  @Input() workspaceMode = true;
  logoutPopup = false;
  profilePopup = false;
  mouseOvered = false;
  mouseOveredTwo = false;
  currentUser = '';
  user$: Observable<any>;
  user: User = new User();
  coll = collection(this.firestore, 'users');
  userName = '';
  userMail = '';
  userStatus = '';


  constructor(private router: Router, private auth: Auth, private route: ActivatedRoute, public firestore: Firestore) { }

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user$) => {
      if (user$) {
        this.currentUser = user$.uid;
        console.log(this.currentUser);
        this.getUserName();
      }
    })
  }

  getUserName() {
    const docRef = doc(this.coll, this.currentUser);
    this.user$ = docData(docRef);
    this.user$.subscribe(user => {
      // this.user = new User(user);
      this.userName = user.name;
      this.userMail = user.mail;
      this.userStatus = user.status;
      console.log('Retrieved userName', user.name);
    })
  }

  openPopup() {
    this.logoutPopup = true;
  }

  closePopup() {
    this.logoutPopup = false;
  }

  logout() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/']);
    })
  }

  openProfilePopup() {
    this.profilePopup = true;
  }

  closeProfilePopup() {
    this.profilePopup = false;
  }

}
