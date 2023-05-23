import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, docData, getDoc, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChannelMessages } from 'src/models/channelmessage.class';
import { ServiceService } from '../service.service';
import { idToken } from '@angular/fire/auth';
import { get } from '@angular/fire/database';

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
  // userMessages = [];
  // memberMessages = [];
  // howManyAnswers;
  // numberOfAnswers;
  // answers = [];
  // new = [];
  // docId;
  newName;
  newDescription;


  ngOnInit(): void {
    this.userId = localStorage.getItem('currentUser');
    this.currentChannel = localStorage.getItem('Channel ID');
    console.log(this.currentChannel);
    this.service.howManyUsers.subscribe(data => {
      this.howManyUsers = data;
    });
    this.getChannelData();
    this.getMessagesData();
    // this.getMessageAnswers();
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
      console.log('messages', this.messages);
      this.messagePosition();
      // this.combineAnswers();
    });
  }

  // combineAnswers() {
  //   for (let i = 0; i < this.messages.length; i++) {
  //     const element = this.messages[i];
  //     element.howManyAnswers = this.answers.length;
  //   }
  // }

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

  // getMessageAnswers() {
  //   let docRefi = collection(this.firestore, 'channels');
  //   let docRef = doc(docRefi, this.currentChannel);
  //   let subCollRef = collection(docRef, 'messages');
  //   getDocs(subCollRef).then(function(querySnapshot) {
  //     querySnapshot.forEach(function(doc) {
  //       console.log(doc.id, '=>', doc.data());
  //     });
  //   })


  //   const querySnapshot = await getDocs(collection(this.firestore, 'channels', this.currentChannel, 'messages'));
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, " => ", doc.data());
  //     this.docId = doc.id;
  //   });

  //   this.newFunction();
  // }

  // async newFunction() {
  //   let coll = collection(this.firestore, 'channels', this.currentChannel, 'messages', this.docId, 'answers');
  //   collectionData(coll, { idField: 'id' }).subscribe(answers => {
  //     this.answers = answers;
  //     console.log('Hallo Antworten', this.answers)
  //   });

  //   const querySnapshot = await getDocs(collection(this.firestore, 'channels', this.currentChannel, 'messages', this.docId, 'answers'));
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, " => ", doc.data());
  //   });
  // }



  // getUserMessages() {
  //   this.userMessages = this.messages.filter(s => s.threadWriter == this.userName);
  //   console.log('User Messages are',this.userMessages)
  //   this.memberMessages = this.messages.filter(s => s.threadWriter !== this.userName);
  //   console.log('User Messages are',this.memberMessages);
  // }

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
