import { Component, Input, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { PrivateMessages } from 'src/models/privatemessages.class';
import { ServiceService } from '../service.service';
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
  newTime;
  hoveredPm;
  messageToday;
  messagesToday = [];
  date;

  ngOnInit() {
    this.currentUser = localStorage.getItem('currentUser');
    this.service.sendHoveredPm(this.hoveredPm = true);
    this.getNotes();
    setInterval(() => {
      this.newTime = new Date();
    }, 1000)
  }

  constructor(public firestore: Firestore, private service: ServiceService) { }

  createNotes() {
    this.timestamp = this.newTime.getTime().toString();
    this.privateMessages.messageDate = this.currentTimestamp.toLocaleDateString('de-DE');
    this.privateMessages.messageTime = this.currentTimestamp.toLocaleTimeString().slice(0, 5);
    setDoc(doc(this.coll, this.currentUser, "notes", this.timestamp), this.privateMessages.toJSON(), { merge: true }).then(() => {
      this.privateMessages.messageText = '';
    });
  }


  getNotes() {
    let coll = collection(this.firestore, 'users', this.currentUser, 'notes');
    collectionData(coll, { idField: 'id' }).subscribe(notes => {
      this.allNotes = notes;
      this.allNotes = this.allNotes.sort((a, b) => (a.id - b.id));
      // this.messageDates()
    });
  }

  messageDates() {
    this.date = this.currentTimestamp.toLocaleDateString('de-DE');
    // this.messagesToday = this.allNotes.filter(s => s.noteDate == this.date)
    // if(this.messagesToday.length > 0){
    //   this.messageToday = true;
    // }
    // if (this.messagesToday.length > 2) {
    //   this.messageToday = false;
    // }

    for (let i = 0; i < this.allNotes.length; i++) {
      const element = this.allNotes[i].noteDate;

      if(element == this.date) {
        this.messageToday = true;
      } else {
        this.messageToday = false;
      }
    }
    
  }


  openProfilePopup() {
    this.profilePopup = true;
  }

  
  closeProfilePopup() {
    this.profilePopup = false;
  }
}
