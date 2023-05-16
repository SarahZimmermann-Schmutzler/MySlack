import { Component, Input, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { Firestore, collection, collectionData, doc, docData, getDoc, setDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { ServiceService } from '../service.service';

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
  user$: Observable<any>;
  user: User = new User();
  coll = collection(this.firestore, 'users');
  userName = '';
  userMail = '';
  userStatus = '';
  active: boolean;
  currentUser = '';
  startFunction: boolean;
  interval;


  constructor(
    private router: Router, 
    private auth: Auth, 
    private route: ActivatedRoute, 
    public firestore: Firestore,
    private service: ServiceService
    ) { }

  ngOnInit(): void {
    // onAuthStateChanged(this.auth, (user$) => {
    //   if (user$) {
    //     this.currentUser = user$.uid;
    //     // console.log(this.currentUser);
    //     this.getUserData();
    //   } 
    //   else {
    //     this.currentUser = 'kLLzHS4VI6TDTL2gZUPbRzgOoID3';
    //     this.getUserData();
    //   }
    // });

    this.interval = setInterval(() => {
      if (this.workspaceMode) {
        this.currentUser = localStorage.getItem('currentUser');
        console.log(this.currentUser);
        this.getUserData()
      }
    }, 1000);
  }

  getUserData() {
    const docRef = doc(this.coll, this.currentUser);
    this.user$ = docData(docRef);
    this.user$.subscribe(user => {
      // this.user = new User(user);
      this.userName = user.name;
      this.userMail = user.mail;
      this.userStatus = user.status;
      this.service.sendUserStatus(this.userStatus);
      // console.log('Retrieved userName', user.name);
      this.colorStatus();
      clearInterval(this.interval);
    })
  }

  colorStatus() {
    if (this.userStatus == 'Active') {
      this.active = true;
    }

    if (this.userStatus == 'Inactive') {
      this.active = false;
    }
  }

  openPopup() {
    this.logoutPopup = true;
  }

  closePopup() {
    this.logoutPopup = false;
  }

  logout() {
    setDoc(doc(this.coll, this.currentUser), { status: 'Inactive' }, { merge: true });
    localStorage.setItem('currentUser', '');
    signOut(this.auth).then(() => {
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    })
  }

  openProfilePopup() {
    this.profilePopup = true;
  }

  closeProfilePopup() {
    this.profilePopup = false;
  }

}
