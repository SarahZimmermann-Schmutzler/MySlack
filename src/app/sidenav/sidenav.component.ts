import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Channels } from 'src/models/channels.class';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss', './sidenav2.component.scss']
})
export class SidenavComponent implements OnInit {
  rotateChannel = false;
  rotateMessage = false;
  hideChannel = false;
  hideMessage = false;
  hoverStay = false;
  channelPopup = false;
  @Input() userName: string;
  @Input() userPic;
  @Output() showThreadSection = new EventEmitter();
  @Output() fullSize = new EventEmitter();
  channels = new Channels();
  collCh = collection(this.firestore, 'channels');
  collUs = collection(this.firestore, 'users');
  allChannels: Array<any> | undefined;
  allUsers: Array<any> | undefined;
  channelId;
  currentUser;
  guestUser = 'kLLzHS4VI6TDTL2gZUPbRzgOoID3';
  members = [];
  userStatus;
  active = false;
  howManyUsers;

  constructor(public firestore: Firestore, private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');

    collectionData(this.collCh, {idField: 'id'}).subscribe(newChannels => {
      this.allChannels = newChannels;
    })

    collectionData(this.collUs, {idField: 'id'}).subscribe(Users => {
      this.allUsers = Users;
      this.howManyUsers = this.allUsers.length;
      this.service.sendNumberOfUsers(this.howManyUsers);
    })

    this.service.userStatus.subscribe(data => {
      this.userStatus = data;
      this.active = true;
    })
  }

  
  createNewChannel() {
    addDoc(this.collCh, this.channels.toJSON()).then(() => {
      this.channels.name = '';
      this.channels.description = '';
      this.closePopup();
    });
  }


  openAndCloseChannels() {
    this.rotateChannel = !this.rotateChannel;
    this.hideChannel = !this.hideChannel;
    this.fullSize.emit(true);
  }


  openAndCloseDirectMessages() {
    this.rotateMessage = !this.rotateMessage;
    this.hideMessage = !this.hideMessage;
    this.members = this.allUsers.filter(s => s.name !== this.userName);
    this.fullSize.emit(true);
  }


  createChannel() {
    this.channelPopup = true;
  }


  closePopup() {
    this.channelPopup = false;
  }


  openPrivateMessages() {
    this.router.navigateByUrl('/ws-private')
  }


  openDirectMessages(memberId) {
    localStorage.setItem('currentMember', memberId);
    this.router.navigateByUrl('/ws-direct').then(() => {
      window.location.reload();
    });
  }


  openNewMessage() {
    // coming soon
  }


  openChannelMessages(channelId) {
    // this.showThreadSection.emit(false);
    localStorage.setItem('Channel ID', channelId);
    this.router.navigateByUrl('/ws-channel').then(()=> {
      window.location.reload();
    });
  }


  // hideThreadSection() {
  //   this.showThreadSection.emit(false);
  // }
}
