import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, docData, getDocs, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChannelMessages } from 'src/models/channelmessage.class';

@Component({
  selector: 'app-channel-messages',
  templateUrl: './channel-messages.component.html',
  styleUrls: ['./channel-messages.component.scss']
})
export class ChannelMessagesComponent implements OnInit {
  mouseOvered = false;
  mouseOveredTwo = false;
  mouseOveredThree = false;
  channelPopup = false;
  @Output() showThreadsSection = new EventEmitter();
  @Input() userName;
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
  userMessages = [];
  userIsMe = false;
  result = [];
  

  ngOnInit(): void {
    this.userId = localStorage.getItem('currentUser');
    this.currentChannel = localStorage.getItem('Channel ID');
    console.log(this.currentChannel);
    this.getChannelData();
    this.getMessagesData()
  }

  constructor(public firestore: Firestore) {}

  getChannelData() {
    const docRef = doc(this.collCh, this.currentChannel);
    this.channel$ = docData(docRef);
    this.channel$.subscribe(channel => {
      this.channelName = channel.name;
      this.channelDescription = channel.description;
    })
  }

  getMessagesData() {
    let coll = collection(this.firestore, 'channels', this.currentChannel, 'messages');
    collectionData(coll).subscribe(messages => {
      console.log('Messages sind', messages);
      this.messages = messages;
      console.log('This Messages sind', this.messages)
    })
    this.getUserMessages();
  }

  getUserMessages() {
    for (let i = 0; i < this.messages.length; i++) {
      const messages = this.messages[i];
      console.log('const Message includes', messages);
      
      if(messages.threadWriter == 'BeHRMEboncdaltnPd0iYDN9cMBe2') {
        this.userIsMe = true;
      }
      // this.userMessages = messages.filter(element => element.threadWriter == this.userId);

    }
    console.log('User Messages are', this.userIsMe);
  }


  setMessages() {
    this.timestamp = this.currentTimestamp.getTime().toString();
    this.channelMessages.threadWriter = this.userId;
    this.channelMessages.threadDate = this.currentTimestamp.toLocaleDateString('de-DE');
    this.channelMessages.threadTime = this.currentTimestamp.toLocaleTimeString().slice(0,5);
    setDoc(doc(this.collCh, this.currentChannel, "messages", this.timestamp),this.channelMessages.toJSON(), {merge: true});
    localStorage.setItem('messageId', this.timestamp);
    this.channelMessages.threadText = '';
  }
  
  openThread() {
    this.showThreadsSection.emit(true);
  }

  editChannel() {
    this.channelPopup = true;
  }

  closePopup() {
    this.channelPopup = false;
  }
}
