import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  currentChannelName = new Subject();
  userStatus = new Subject();
  howManyUsers = new Subject();
  guestUser = new Subject();
  userName = new Subject();
  userPic = new Subject();
  hoveredChannel = new Subject();
  hoveredMember = new Subject();
  hoveredPm = new Subject();

  constructor() { }

  sendChannelName(data) {
    this.currentChannelName.next(data);
  }

  sendUserStatus(data) {
    this.userStatus.next(data);
  }

  sendNumberOfUsers(data) {
    this.howManyUsers.next(data);
  }

  sendGuestUser(data) {
    this.guestUser.next(data);
  }

  sendChannelId(data) {
    this.hoveredChannel.next(data);
  }

  sendMemberId(data) {
    this.hoveredMember.next(data);
  }

  sendHoveredPm(data) {
    this.hoveredPm.next(data);
  }
}
