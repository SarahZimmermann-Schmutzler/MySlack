import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData, doc, docData, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Channels } from 'src/models/channels.class';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  rotateChannel = false;
  rotateMessage = false;
  hideChannel = false;
  hideMessage = false;
  hoverStay = false;
  channelPopup = false;
  @Input() userName: string;
  channels = new Channels();
  collCh = collection(this.firestore, 'channels');
  collUs = collection(this.firestore, 'users');
  allChannels: Array<any> | undefined;
  allUsers: Array<any> | undefined;
  channelId;
  currentUser;
  guestUser = 'kLLzHS4VI6TDTL2gZUPbRzgOoID3';
  allNames: Array<any> | undefined;
  members = [];

  constructor(private auth: Auth, public firestore: Firestore) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');

    collectionData(this.collCh, {idField: 'id'}).subscribe(newChannels => {
      console.log('Neue Channels sind', newChannels);
      this.allChannels = newChannels;
    })

    collectionData(this.collUs, {idField: 'id'}).subscribe(Users => {
      this.allUsers = Users;
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
    
  }

  openAndCloseDirectMessages() {
    this.rotateMessage = !this.rotateMessage;
    this.hideMessage = !this.hideMessage;
    this.members = this.allUsers.filter(s => s.name !== this.userName && s.name !== 'Guest');
  }

  createChannel() {
    this.channelPopup = true;
  }

  closePopup() {
    this.channelPopup = false;
  }

  openPrivateMessages() {
    // this.showChannelMessages.emit(false);
    // this.showPrivateMessages.emit(true);
    // this.showDirectMessages.emit(false);
    // this.showNewMessage.emit(false);
    // this.showThreadSection.emit(false);
    this.hoverStay = false;
  }

  openDirectMessages() {
    // this.showChannelMessages.emit(false);
    // this.showDirectMessages.emit(true);
    // this.showPrivateMessages.emit(false);
    // this.showNewMessage.emit(false);
    // this.showThreadSection.emit(false);
    this.hoverStay = false;
  }

  openNewMessage() {
    // this.showChannelMessages.emit(false);
    // this.showNewMessage.emit(true);
    // this.showDirectMessages.emit(false);
    // this.showPrivateMessages.emit(false);
    // this.showThreadSection.emit(false);
    this.hoverStay = false;
  }

  openChannelMessages(channelId) {
    // this.showChannelMessages.emit(true);
    // this.showNewMessage.emit(false);
    // this.showDirectMessages.emit(false);
    // this.showPrivateMessages.emit(false);
    // this.showThreadSection.emit(false);
    this.hoverStay = true;
    console.log(channelId)
    localStorage.setItem('Channel ID', channelId);
    window.location.reload();
  }

  // hideThreadSection() {
  //   this.showThreadSection.emit(false);
  // }
}
