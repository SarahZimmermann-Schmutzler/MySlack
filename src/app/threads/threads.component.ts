import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { ThreadAnswers } from 'src/models/threadanswers.class';

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

  ngOnInit(): void {
    this.currentChannel = localStorage.getItem('Channel ID');
    this.currentMessage = localStorage.getItem('messageId');
    this.currentThread = localStorage.getItem('threadId');
  }

  constructor(public firestore: Firestore) {}

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

  closeThread() {
    this.showThreadsSection.emit(false);
  }
} 

