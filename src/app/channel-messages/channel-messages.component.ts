import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChannelMessages } from 'src/models/channelmessage.class';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-channel-messages',
  templateUrl: './channel-messages.component.html',
  styleUrls: ['./channel-messages.component.scss']
})

export class ChannelMessagesComponent implements OnInit {
  // mouseOvered = false;
  mouseOveredTwo = false;
  mouseOveredThree = false;
  channelPopup = false;
  @Output() showThreadsSection = new EventEmitter();
  @Input() userName;
  @Input() userPic;
  currentChannel;
  userId;
  collCh = collection(this.firestore, 'channels');
  channel$: Observable<any>;
  channelName;
  channelDescription;
  channelMessages = new ChannelMessages();
  currentTimestamp = new Date();
  timestamp;
  channelThread;
  messages$: Observable<any>;
  messages = [];
  threadText;
  howManyUsers;
  newName;
  newDescription;
  hoveredIndex: number | null = null;


  ngOnInit(): void {
    this.userId = localStorage.getItem('currentUser');
    this.currentChannel = localStorage.getItem('Channel ID');
    this.service.howManyUsers.subscribe(data => {
      this.howManyUsers = data;
    });
    this.getChannelData();
    this.getMessagesData();
  }

  constructor(public firestore: Firestore, private service: ServiceService) { }

  saveChangesName() {
    let docRef = doc(this.collCh, this.currentChannel);
    updateDoc(docRef, { name: this.newName });
  }


  saveChangesDescription() {
    let docRef = doc(this.collCh, this.currentChannel);
    updateDoc(docRef, { description: this.newDescription });
  }


  getChannelData() {
    const docRef = doc(this.collCh, this.currentChannel);
    this.channel$ = docData(docRef);
    this.channel$.subscribe(channel => {
      this.channelName = channel.name;
      this.channelDescription = channel.description;
      this.service.sendChannelName(this.channelName);
    })
  }


  getMessagesData() {
    let coll = collection(this.firestore, 'channels', this.currentChannel, 'messages');
    collectionData(coll, { idField: 'id' }).subscribe(messages => {
      this.messages = messages;
      this.messagePosition();
    });
  }


  messagePosition() {
    for (let i = 0; i < this.messages.length; i++) {
      const element = this.messages[i];
      if (element.threadWriter == this.userName) {
        element.thisIsUser = true;
      } else {
        element.thisIsUser = false;
      }
    }
  }


  setMessages() {
    this.timestamp = this.currentTimestamp.getTime().toString();
    this.channelMessages.threadWriter = this.userName;
    this.channelMessages.threadPic = this.userPic;
    this.channelMessages.threadDate = this.currentTimestamp.toLocaleDateString('de-DE');
    this.channelMessages.threadTime = this.currentTimestamp.toLocaleTimeString().slice(0, 5);
    this.channelMessages.thisIsUser = '';
    setDoc(doc(this.collCh, this.currentChannel, "messages", this.timestamp), this.channelMessages.toJSON(), { merge: true });
    localStorage.setItem('messageId', this.timestamp);
    this.channelMessages.threadText = '';
  }


  openThread(threadId) {
    this.showThreadsSection.emit(true);
    localStorage.setItem('threadId', threadId);
    window.location.reload();
  }


  editChannel() {
    this.channelPopup = true;
  }


  closePopup() {
    this.channelPopup = false;
  }
}
