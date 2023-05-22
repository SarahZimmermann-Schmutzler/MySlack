import { Component, Input } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent {
  showThreadsSection: boolean = true;
  showChannelMessages = true;
  showPrivateMessages = false;
  showDirectMessages = false;
  showNewMessage = false;
  currentUser = '';
  // guestUser = 'kLLzHS4VI6TDTL2gZUPbRzgOoID3';
  userName = '';
  userPic = '';
  user$: Observable<any>;
  coll = collection(this.firestore, 'users');
  allUsers = [];
  userNames = [];
 

  constructor(private auth: Auth, public firestore: Firestore) { }

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
    })
  }

  setVariableFalse($event: any) {
    this.showThreadsSection = $event;
  }

  setVariableTrue($event) {
    console.log($event);
    this.showThreadsSection = $event;
  }

  showDirectMessagesSection($event) {
    console.log($event)
    this.showDirectMessages = $event;
  }

  hideChannelMessagesSection($event) {
    this.showChannelMessages = $event;
  }

  showPrivateMessagesSection($event) {
    this.showPrivateMessages = $event;
  }

  showNewMessageSection($event) {
    this.showNewMessage = $event;
  }

  hideThreadSection($event) {
    this.showThreadsSection = $event;
  }
}
