import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  numberOfAnswers = new Subject();

  constructor() { }

  sendData(data) {
    this.numberOfAnswers.next(data);
  }
}
