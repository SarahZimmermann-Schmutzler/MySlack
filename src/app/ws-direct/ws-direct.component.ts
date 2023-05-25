import { Component, Input } from '@angular/core';
import { Firestore, collection, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-ws-direct',
  templateUrl: './ws-direct.component.html',
  styleUrls: ['./ws-direct.component.scss']
})
export class WsDirectComponent {
  showThreadsSection: boolean = true;
  showChannelMessages = true;
  showPrivateMessages = false;
  showDirectMessages = false;
  showNewMessage = false;
  showSidenav = true;
  currentUser = '';
  // guestUser = 'kLLzHS4VI6TDTL2gZUPbRzgOoID3';
  userName = '';
  userPic = '';
  user$: Observable<any>;
  coll = collection(this.firestore, 'users');
  // allUsers = [];
  // userNames = [];
 

  constructor(public firestore: Firestore, private service: ServiceService) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');
    console.log(this.currentUser);
    this.getCurrentUserData();
  }


  getCurrentUserData() {
    const docRef = doc(this.coll, this.currentUser);
    this.user$ = docData(docRef);
    this.user$.subscribe(currentUser => {
      this.userName = currentUser.name;
      this.userPic = currentUser.pic;
      // this.service.sendUserName(this.userName);
      // this.service.sendUserPic(this.userPic);
    })
  }


  setVariableFalse($event: any) {
    this.showThreadsSection = $event;
  }


  setVariableTrue($event) {
    this.showThreadsSection = $event;
  }


  // showDirectMessagesSection($event) {
  //   this.showDirectMessages = $event;
  // }


  // hideChannelMessagesSection($event) {
  //   this.showChannelMessages = $event;
  // }


  // showPrivateMessagesSection($event) {
  //   this.showPrivateMessages = $event;
  // }


  // showNewMessageSection($event) {
  //   this.showNewMessage = $event;
  // }


  hideThreadSection($event) {
    this.showThreadsSection = $event;
  }
}
