import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Firestore, Timestamp, addDoc, collection, doc, docData, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChannelMessages } from 'src/models/channelmessage.class';
import { User } from 'src/models/user.class';

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
  date;
  
  

  ngOnInit(): void {
    this.userId = localStorage.getItem('currentUser');
    this.currentChannel = localStorage.getItem('Channel ID');
    console.log(this.currentChannel);
    this.getChannelData();
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

  setMessages() {
    this.timestamp = this.currentTimestamp.getTime().toString();
    this.channelMessages.threadWriter = this.userId;
    this.date = this.currentTimestamp.getDate();
    this.channelMessages.threadDate
    this.channelMessages.threadTime
    console.log('Timestamp is', this.currentTimestamp)
   
    // setDoc(doc(this.collCh, this.currentChannel, "messages", this.timestamp),this.channelMessages.toJSON(), {merge: true});
    // this.channelMessages.threadText = '';
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
