import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, docData, getDocs, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChannelMessages } from 'src/models/channelmessage.class';
import { ServiceService } from '../service.service';

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
  @Output() showPrivateMessages = new EventEmitter();
  @Output() showDirectMessages = new EventEmitter();
  @Output() showNewMessage = new EventEmitter();
  @Output() showChannelMessages = new EventEmitter();
  @Output() showThreadSection = new EventEmitter();
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
  memberMessages = [];
  howManyAnswers;
  

  ngOnInit(): void {
    
    this.userId = localStorage.getItem('currentUser');
    this.currentChannel = localStorage.getItem('Channel ID');
    console.log(this.currentChannel);
    this.getChannelData();
    this.getMessagesData();
    // this.view();
    this.service.numberOfAnswers.subscribe(data => {
      this.howManyAnswers = data;
    })
  }

  constructor(public firestore: Firestore, private service: ServiceService) {}

  view() {
    this.showChannelMessages.emit(true);
    this.showNewMessage.emit(false);
    this.showDirectMessages.emit(false);
    this.showPrivateMessages.emit(false);
    // this.showThreadSection.emit(false);
  }

  // hideThreadSection() {
  //   this.showThreadSection.emit(false);
  // }

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
    collectionData(coll, {idField: 'id'}).subscribe(messages => {
      console.log('Messages sind', messages);
      this.messages = messages;
      console.log('This Messages sind', this.messages)

      this.getUserMessages();
    });
  }

  getUserMessages() {
    this.userMessages = this.messages.filter(s => s.threadWriter == this.userName);
    console.log('User Messages are',this.userMessages)
    this.memberMessages = this.messages.filter(s => s.threadWriter !== this.userName);
    console.log('User Messages are',this.memberMessages);
  }

  setMessages() {
    this.timestamp = this.currentTimestamp.getTime().toString();
    this.channelMessages.threadWriter = this.userName;
    this.channelMessages.threadDate = this.currentTimestamp.toLocaleDateString('de-DE');
    this.channelMessages.threadTime = this.currentTimestamp.toLocaleTimeString().slice(0,5);
    setDoc(doc(this.collCh, this.currentChannel, "messages", this.timestamp),this.channelMessages.toJSON(), {merge: true});
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
