import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { Channels } from 'src/models/channels.class';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss', './sidenav2.component.scss']
})
export class SidenavComponent implements OnInit {
  rotateChannel = true;
  rotateMessage = true;
  hideChannel = true;
  hideMessage = true;
  hoverStay = false;
  channelPopup = false;
  @Input() userName: string;
  @Input() userPic;
  @Output() showThreadSection = new EventEmitter();
  @Output() fullSize = new EventEmitter();
  // @Output() showMessage = new EventEmitter();
  // @Output() hideSidenav = new EventEmitter();
  collCh = collection(this.firestore, 'channels');
  collUs = collection(this.firestore, 'users');
  allChannels: Array<any> | undefined;
  allUsers: Array<any> | undefined;
  channels = new Channels();
  channelId;
  currentUser;
  guestUser = 'kLLzHS4VI6TDTL2gZUPbRzgOoID3';
  members = [];
  userStatus;
  active = false;
  howManyUsers;
  channelDescription;
  hoveredIndex: number | null = null;

  constructor(public firestore: Firestore, private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');

    collectionData(this.collCh, { idField: 'id' }).subscribe(newChannels => {
      this.allChannels = newChannels;
    })

    collectionData(this.collUs, { idField: 'id' }).subscribe(Users => {
      this.allUsers = Users;
      this.members = this.allUsers.filter(s => s.name !== this.userName);
      this.howManyUsers = this.allUsers.length;
      this.service.sendNumberOfUsers(this.howManyUsers);
    })

    this.service.userStatus.subscribe(data => {
      this.userStatus = data;
      this.active = true;
    })
  }


  createNewChannel() {
    this.channels.description = this.channelDescription || '';
    addDoc(this.collCh, this.channels.toJSON()).then(() => {
      this.channels.name = '';
      this.channels.description = '';
      this.closePopup();
    });
  }


  openAndCloseChannels() {
    this.rotateChannel = !this.rotateChannel;
    this.hideChannel = !this.hideChannel;
    // this.fullSize.emit(false);
  }


  openAndCloseDirectMessages() {
    this.rotateMessage = !this.rotateMessage;
    this.hideMessage = !this.hideMessage;
    // this.members = this.allUsers.filter(s => s.name !== this.userName);
    // this.fullSize.emit(false);
  }


  createChannel() {
    this.channelPopup = true;
  }


  closePopup() {
    this.channelPopup = false;
  }


  openPrivateMessages() {
    this.router.navigateByUrl('/ws-private').then(() => {
      window.location.reload();
    });
  }


  openDirectMessages(memberId) {
    localStorage.setItem('currentMember', memberId);
    this.router.navigateByUrl('/ws-direct').then(() => {
      window.location.reload();
    });
  }


  openChannelMessages(channelId) {
    localStorage.setItem('Channel ID', channelId);
    this.router.navigateByUrl('/ws-channel').then(() => {
      window.location.reload();
    });
  }

  openChannelMessagesResponsive(channelId) {
    localStorage.setItem('Channel ID', channelId);
    // this.showMessage.emit(true);
    // this.hideSidenav.emit(true);
    this.router.navigateByUrl('/channel-responsive').then(() => {
      window.location.reload();
    });
  }

  openPrivateMessagesResponsive() {
    this.router.navigateByUrl('/private-responsive').then(() => {
      window.location.reload();
    });
  }
}
