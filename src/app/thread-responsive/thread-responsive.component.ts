import { Component } from '@angular/core';
import { Firestore, collection, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-thread-responsive',
  templateUrl: './thread-responsive.component.html',
  styleUrls: ['./thread-responsive.component.scss']
})
export class ThreadResponsiveComponent {
  showThreadsSection: boolean = true;
  channelFull = false;
  // hideSidenav = false;
  // showChannelMessages = true;
  // showPrivateMessages = false;
  // showDirectMessages = false;
  // showNewMessage = false;
  // showSidenav = true;
  currentUser = '';
  userName = '';
  userPic = '';
  user$: Observable<any>;
  coll = collection(this.firestore, 'users');
  // fullSize = true;
  // showMessage = false;
  // hideSidenav = false;
 

  constructor(public firestore: Firestore) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');
    this.getCurrentUserData();
  }


  getCurrentUserData() {
    const docRef = doc(this.coll, this.currentUser);
    this.user$ = docData(docRef);
    this.user$.subscribe(currentUser => {
      this.userName = currentUser.name;
      this.userPic = currentUser.pic;
    })
  }


  // setVariableFalse($event: any) {
  //   this.showThreadsSection = $event;
  // }


  // setVariableTrue($event) {
  //   this.showThreadsSection = $event;
  // }


  // hideThreadSection($event) {
  //   this.showThreadsSection = $event;
  // }


  // makeChannelFull($event) {
  //   this.channelFull = $event;
  // }
}
