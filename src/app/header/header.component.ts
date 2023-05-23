import { Component, Input, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { Firestore, collection, collectionData, deleteDoc, doc, docData, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
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
  searchPopup = false;
  mouseOvered = false;
  mouseOveredTwo = false;
  user$: Observable<any>;
  user: User = new User();
  coll = collection(this.firestore, 'users');
  userName = '';
  userMail = '';
  userStatus = '';
  userPic = '';
  active: boolean;
  currentUser = '';
  guestUser = 'kLLzHS4VI6TDTL2gZUPbRzgOoID3';
  // guestUser;
  startFunction: boolean;
  interval;
  allUsers = [];
  results = [];
  find;


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

    // this.service.guestUser.subscribe(data => {
    //   this.guestUser = data;
    //   console.log(this.guestUser)
    // })
  }

  getUserData() {
    const docRef = doc(this.coll, this.currentUser);
    this.user$ = docData(docRef);
    this.user$.subscribe(user => {
      // this.user = new User(user);
      this.userName = user.name;
      this.userMail = user.mail;
      this.userStatus = user.status;
      this.userPic = user.pic;
      this.colorStatus();
      this.service.sendUserStatus(this.userStatus);
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

  async logout() {
    let ref = doc(this.coll, this.currentUser)
    await updateDoc(ref, { status: 'Inactive' }).then(() => {
      localStorage.setItem('currentUser', '');
    });

    // this.deleteGuestData();
    
    signOut(this.auth).then(() => {
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    })
  }

  // deleteGuestData() {
  //   if(this.currentUser == this.guestUser) {
  //     let ref = doc(this.coll, this.guestUser);
  //     deleteDoc(ref);
  //   }
  // }

  openProfilePopup() {
    this.profilePopup = true;
  }

  closeProfilePopup() {
    this.profilePopup = false;
  }

  openSearchPopup() {
    this.searchPopup = true;
    let coll = collection(this.firestore, 'users')
    collectionData(coll, {idField: 'id'}).subscribe(Users => {
      this.allUsers = Users;
      let searchInput = this.find.toLowerCase();

      for (let i = 0; i < this.allUsers.length; i++) {
        const searchName = this.allUsers[i]['name'].toLowerCase();
        if(searchName.match(searchInput) == searchInput) {
          this.results.push(this.allUsers[i]);
          this.find = '';
        }
      }
    })
  }

  closeSearchPopup() {
    this.searchPopup = false;
    this.results = [];
  }

}
