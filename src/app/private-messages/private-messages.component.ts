import { Component, Input, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
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
  }

  constructor(public firestore: Firestore) { }

  createNotes() {
    this.timestamp = this.currentTimestamp.getTime().toString();
    this.privateMessages.messageDate = this.currentTimestamp.toLocaleDateString('de-DE');
    this.privateMessages.messageTime = this.currentTimestamp.toLocaleTimeString().slice(0, 5);
    setDoc(doc(this.coll, this.currentUser, "notes", this.timestamp), this.privateMessages.toJSON(), { merge: true }).then(() => {
      this.privateMessages.messageText = '';
      window.location.reload();
    });
  }


  getNotes() {
    let coll = collection(this.firestore, 'users', this.currentUser, 'notes');
    collectionData(coll, { idField: 'id' }).subscribe(notes => {
      this.allNotes = notes;
      console.log('notes are', this.allNotes)
      this.allNotes = this.allNotes.sort((a, b) => (a.id - b.id));
    });
  }


  openProfilePopup() {
    this.profilePopup = true;
  }

  
  closeProfilePopup() {
    this.profilePopup = false;
  }
}
