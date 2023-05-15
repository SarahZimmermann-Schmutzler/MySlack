import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { ThreadAnswers } from 'src/models/threadanswers.class';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.scss']
})
export class ThreadsComponent implements OnInit {
  mouseOvered = false;
  @Output() showThreadsSection = new EventEmitter();
  @Input() userName;
  threadAnswers = new ThreadAnswers();
  currentTimestamp = new Date();
  timestamp;
  currentChannel;
  currentMessage;
  currentThread;
  currentUser;
  answers = [];
  userAnswers = [];
  memberAnswers = [];
  howManyAnswers;
  currentChannelName;

  ngOnInit(): void {
    this.currentChannel = localStorage.getItem('Channel ID');
    this.currentMessage = localStorage.getItem('messageId');
    this.currentThread = localStorage.getItem('threadId');
    this.currentUser = localStorage.getItem('currentUser');
    this.service.currentChannelName.subscribe(data => {
      this.currentChannelName = data;
    })
    this.getAnswerData();
  }

  constructor(public firestore: Firestore, private service: ServiceService) {}

  setAnswers() {
    let coll = collection(this.firestore, 'channels', this.currentChannel, 'messages');
    this.timestamp = this.currentTimestamp.getTime().toString();
    this.threadAnswers.answerWriter = this.userName;
    this.threadAnswers.answerDate = this.currentTimestamp.toLocaleDateString('de-DE');
    this.threadAnswers.answerTime = this.currentTimestamp.toLocaleTimeString().slice(0,5);
    setDoc(doc(coll, this.currentThread, "answers", this.timestamp),this.threadAnswers.toJSON(), {merge: true});
    localStorage.setItem('answerId', this.timestamp);
    this.threadAnswers.answerText = '';
  }

  getAnswerData() {
    let coll = collection(this.firestore, 'channels', this.currentChannel, 'messages', this.currentThread, 'answers');
    collectionData(coll, {idField: 'id'}).subscribe(answers => {
      console.log('Answers are', answers);
      this.answers = answers;
      console.log('Answers are', this.answers);
      console.log('Länge', this.answers.length);
      this.howManyAnswers = this.answers.length;
      this.service.sendData(this.howManyAnswers);
      this.getUserAnswers();
    });
  }

  getUserAnswers() {
    this.userAnswers = this.answers.filter(s => s.answerWriter == this.userName);
    console.log('User Answers are',this.userAnswers)
    this.memberAnswers = this.answers.filter(s => s.answerWriter !== this.userName);
    console.log('Member Answers are',this.memberAnswers);
  }

  closeThread() {
    this.showThreadsSection.emit(false);
  }
} 

