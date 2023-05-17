import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  numberOfAnswers = new Subject();
  currentChannelName = new Subject();
  userStatus = new Subject();
  answerData = new Subject<[]>();

  constructor() { }

  sendData(data) {
    this.numberOfAnswers.next(data);
  }

  sendChannelName(data) {
    this.currentChannelName.next(data);
  }

  sendUserStatus(data) {
    this.userStatus.next(data);
  }

  sendAnswerData(data) {
    this.answerData.next(data);
  }
}
