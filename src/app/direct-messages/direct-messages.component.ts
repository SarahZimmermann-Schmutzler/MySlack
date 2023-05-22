import { Component, Input, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Firestore, collection, collectionData, doc, docData, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DirectMessages } from 'src/models/directmessages.class';

@Component({
  selector: 'app-direct-messages',
  templateUrl: './direct-messages.component.html',
  styleUrls: ['./direct-messages.component.scss']
})
export class DirectMessagesComponent implements OnInit {
  mouseOvered = false;
  mouseOveredTwo = false;
  mouseOveredThree = false;
  profilePopup = false;
  @Input() userName;
  @Input() userPic;
  member$: Observable<any>;
  active = false;
  userStatus;
  currentMember;
  currentUser;
  coll = collection(this.firestore, 'users');
  memberName;
  memberStatus;
  memberMail;
  memberPic;
  timestamp;
  currentTimestamp = new Date();
  directMessages = new DirectMessages();
  userDirectMessages = [];
  memberDirectMessages = [];
  allDirectMessages = [];
  allDirectMessagesSorted = [];

  ngOnInit() {
    this.currentMember = localStorage.getItem('currentMember');
    this.currentUser = localStorage.getItem('currentUser');
    this.getMessageData();
    this.getMemberData();
  }

  constructor(private service: ServiceService, private firestore: Firestore) {}

  createDirectMessages() {
    this.timestamp = this.currentTimestamp.getTime().toString();
    this.directMessages.messageDate = this.currentTimestamp.toLocaleDateString('de-DE');
    this.directMessages.messageTime = this.currentTimestamp.toLocaleTimeString().slice(0,5);
    this.directMessages.messageWriter = this.userName;
    this.directMessages.messagePic = this.userPic;
    this.directMessages.thisIsUser = '';
    setDoc(doc(this.coll, this.currentMember, "directMessages", this.timestamp),this.directMessages.toJSON(), {merge: true}).then(() => {
      this.directMessages.messageText = '';
    });
  }

  getMessageData() {
    this.getUserDirectMessageData();
    this.getMemberDirectMessageData();
  }

  getUserDirectMessageData() {
    let coll = collection(this.firestore, 'users', this.currentMember, 'directMessages');
    collectionData(coll, {idField: 'id'}).subscribe(dm => {
      this.userDirectMessages = dm;
    });
  }

  getMemberDirectMessageData() {
    let coll = collection(this.firestore, 'users', this.currentUser, 'directMessages');
    collectionData(coll, {idField: 'id'}).subscribe(dm => {
      this.memberDirectMessages = dm;
      this.combineToMessageData();
    });
  }

  combineToMessageData() {
    this.allDirectMessages = this.userDirectMessages.concat(this.memberDirectMessages);
    this.allDirectMessagesSorted = this.allDirectMessages.sort((a,b) => (a.id - b.id));
    this.messagePosition();
    this.getMessageData();
  }

  messagePosition() {
    for (let i = 0; i < this.allDirectMessagesSorted.length; i++) {
      const element = this.allDirectMessagesSorted[i];
      if(element.messageWriter == this.userName) {
        element.thisIsUser = true;
      } else {
        element.thisIsUser = false;
      }
    }
  }

  getMemberData() {
    const docRef = doc(this.coll, this.currentMember);
    this.member$ = docData(docRef);
    this.member$.subscribe(member => {
      this.memberName = member.name;
      this.memberStatus = member.status;
      this.memberMail = member.mail;
      this.memberPic = member.pic;
      console.log('Nutzbild', this.memberPic)
      this.colorStatus();
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

  openProfilePopup() {
    this.profilePopup = true;
  }

  closeProfilePopup() {
    this.profilePopup = false;
  }
}
