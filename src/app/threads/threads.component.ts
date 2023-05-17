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
  lastAnswers = [];

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
    this.threadAnswers.thisIsUser = '';
    setDoc(doc(coll, this.currentThread, "answers", this.timestamp),this.threadAnswers.toJSON(), {merge: true});
    localStorage.setItem('answerId', this.timestamp);
    this.threadAnswers.answerText = '';
  }

  getAnswerData() {
    let coll = collection(this.firestore, 'channels', this.currentChannel, 'messages', this.currentThread, 'answers');
    collectionData(coll, {idField: 'id'}).subscribe(answers => {
      this.answers = answers;

      // zeigt bei jedem Thread die Anzahl des aktuell geöffneten Threads an
      this.howManyAnswers = this.answers.length;
      this.service.sendData(this.howManyAnswers);

      // this.getUserAnswers();
      this.messagePosition();

      // ist die Uhrzeit der letzten Antwort des geöffnetet Threads
      this.getLastAnswer();
    });
  }

  messagePosition() {
    for (let i = 0; i < this.answers.length; i++) {
      const element = this.answers[i];
      if(element.answerWriter == this.userName) {
        element.thisIsUser = true;
      } else {
        element.thisIsUser = false;
      }
    }
  }

  getLastAnswer() {
    this.lastAnswers = this.answers.slice(-1);
    console.log('thisLastAnswer', this.lastAnswers[0].answerTime)
  }

  getUserAnswers() {
    this.userAnswers = this.answers.filter(s => s.answerWriter == this.userName);
    this.memberAnswers = this.answers.filter(s => s.answerWriter !== this.userName);
  }

  closeThread() {
    this.showThreadsSection.emit(false);
  }
} 

