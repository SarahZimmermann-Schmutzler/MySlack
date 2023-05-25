import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, setDoc } from '@angular/fire/firestore';
import { PrivateMessages } from 'src/models/privatemessages.class';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-private-messages',
  templateUrl: './private-messages.component.html',
  styleUrls: ['./private-messages.component.scss']
})
export class PrivateMessagesComponent implements OnInit {
  // mouseOvered = false;
  // mouseOveredTwo = false;
  // mouseOveredThree = false;
  profilePopup = false;
  @Input() userName;
  @Input() userPic;
  user$: Observable<any>;
  privateMessages = new PrivateMessages();
  currentTimestamp = new Date();
  timestamp;
  coll = collection(this.firestore, 'users');
  currentUser;
  allNotes = [];
  username;
  userpic;

  ngOnInit() {
    this.currentUser = localStorage.getItem('currentUser');
    this.getNotes();
    // this.getCurrentUserData();
  }

  getCurrentUserData() {
    const docRef = doc(this.coll, this.currentUser);
    this.user$ = docData(docRef);
    this.user$.subscribe(currentUser => {
      this.username = currentUser.name;
      this.userpic = currentUser.pic;
    })
  }

  constructor(public firestore: Firestore, private service: ServiceService, private router: Router) { }

  createNotes() {
    this.timestamp = this.currentTimestamp.getTime().toString();
    this.privateMessages.messageDate = this.currentTimestamp.toLocaleDateString('de-DE');
    this.privateMessages.messageTime = this.currentTimestamp.toLocaleTimeString().slice(0, 5);
    setDoc(doc(this.coll, this.currentUser, "notes", this.timestamp), this.privateMessages.toJSON(), { merge: true }).then(() => {
      this.privateMessages.messageText = '';
    });
  }


  getNotes() {
    let coll = collection(this.firestore, 'users', this.currentUser, 'notes');
    collectionData(coll, { idField: 'id' }).subscribe(notes => {
      console.log('Notes sind', notes);
      this.allNotes = notes;
    });
  }


  openProfilePopup() {
    this.profilePopup = true;
  }

  
  closeProfilePopup() {
    this.profilePopup = false;
  }
}
