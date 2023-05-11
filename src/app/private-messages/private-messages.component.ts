import { Component, Input, OnInit } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { PrivateMessages } from 'src/models/privatemessages.class';

@Component({
  selector: 'app-private-messages',
  templateUrl: './private-messages.component.html',
  styleUrls: ['./private-messages.component.scss']
})
export class PrivateMessagesComponent implements OnInit {
  mouseOvered = false;
  mouseOveredTwo = false;
  mouseOveredThree = false;
  profilePopup = false;
  @Input() userName;
  privateMessages = new PrivateMessages();
  currentTimestamp = new Date();
  timestamp;
  coll = collection(this.firestore, 'users');
  currentUser;

  ngOnInit() {
    this.currentUser = localStorage.getItem('currentUser')
  }

  constructor(public firestore: Firestore) {}

  createNotes() {
    this.timestamp = this.currentTimestamp.getTime().toString();
    this.privateMessages.messageDate = this.currentTimestamp.toLocaleDateString('de-DE');
    this.privateMessages.messageTime = this.currentTimestamp.toLocaleTimeString().slice(0,5);
    setDoc(doc(this.coll, this.currentUser, "notes", this.timestamp),this.privateMessages.toJSON(), {merge: true});
    this.privateMessages.messageText = '';
  }

  openProfilePopup() {
    this.profilePopup = true;
  }

  closeProfilePopup() {
    this.profilePopup = false;
  }
}
