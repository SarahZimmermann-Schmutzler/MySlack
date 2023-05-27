import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, setDoc } from '@angular/fire/firestore';
import { ThreadAnswers } from 'src/models/threadanswers.class';
import { ServiceService } from '../service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.scss']
})
export class ThreadsComponent implements OnInit {
  mouseOvered = false;
  // mouseOveredOne = false;
  @Output() showThreadsSection = new EventEmitter();
  @Output() channelFull = new EventEmitter();
  @Input() userName;
  @Input() userPic;
  threadAnswers = new ThreadAnswers();
  currentTimestamp = new Date();
  timestamp;
  currentChannel;
  currentMessage;
  currentThread;
  currentUser;
  answers = [];
  howManyAnswers;
  currentChannelName;
  threads$: Observable<any>;
  threadAnswer$: Observable<any>;
  threadWriter;
  threadTime;
  threadText;
  threadPic;
  thereIsAThread = false;
  hoveredIndex: number | null = null;

  ngOnInit(): void {
    this.currentChannel = localStorage.getItem('Channel ID');
    this.currentMessage = localStorage.getItem('messageId');
    this.currentThread = localStorage.getItem('threadId');
    this.currentUser = localStorage.getItem('currentUser');
    this.service.currentChannelName.subscribe(data => {
      this.currentChannelName = data;
    })
    this.getAnswerData();
    this.getThreadData();
  }

  constructor(public firestore: Firestore, private service: ServiceService) { }

  getThreadData() {
    const collCh = collection(this.firestore, 'channels', this.currentChannel, 'messages');
    const docRef = doc(collCh, this.currentThread);
    this.threads$ = docData(docRef);
    this.threads$.subscribe(thread => {
      
      if (thread) {
        this.thereIsAThread = true;
        this.threadWriter = thread.threadWriter;
        this.threadTime = thread.threadTime;
        this.threadText = thread.threadText;
        this.threadPic = thread.threadPic;
      }
    })
  }


  setAnswers() {
    let coll = collection(this.firestore, 'channels', this.currentChannel, 'messages');
    this.timestamp = this.currentTimestamp.getTime().toString();
    this.threadAnswers.answerWriter = this.userName;
    this.threadAnswers.answerPic = this.userPic;
    this.threadAnswers.answerDate = this.currentTimestamp.toLocaleDateString('de-DE');
    this.threadAnswers.answerTime = this.currentTimestamp.toLocaleTimeString().slice(0, 5);
    this.threadAnswers.thisIsUser = '';
    setDoc(doc(coll, this.currentThread, "answers", this.timestamp), this.threadAnswers.toJSON(), { merge: true });
    localStorage.setItem('answerId', this.timestamp);
    this.threadAnswers.answerText = '';
  }


  getAnswerData() {
    let coll = collection(this.firestore, 'channels', this.currentChannel, 'messages', this.currentThread, 'answers');
    collectionData(coll, { idField: 'id' }).subscribe(answers => {
      this.answers = answers;
      this.howManyAnswers = this.answers.length;
      this.messagePosition();
    });
  }


  messagePosition() {
    for (let i = 0; i < this.answers.length; i++) {
      const element = this.answers[i];
      if (element.answerWriter == this.userName) {
        element.thisIsUser = true;
      } else {
        element.thisIsUser = false;
      }
    }
  }


  closeThread() {
    this.showThreadsSection.emit(false);
    this.channelFull.emit(true);
  }
}

