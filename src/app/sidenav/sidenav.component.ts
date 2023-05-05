import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  rotateChannel = false;
  rotateMessage = false;
  hideChannel = false;
  hideMessage = false;
  hoverStay = false;
  channelPopup = false;
  @Output() showPrivateMessages = new EventEmitter();
  @Output() showDirectMessages = new EventEmitter();
  @Output() showNewMessage = new EventEmitter();
  @Output() showChannelMessages = new EventEmitter();
  @Output() showThreadSection = new EventEmitter();

  openAndCloseChannels() {
    this.rotateChannel = !this.rotateChannel;
    this.hideChannel = !this.hideChannel;
    
  }

  openAndCloseDirectMessages() {
    this.rotateMessage = !this.rotateMessage;
    this.hideMessage = !this.hideMessage;
  }

  createChannel() {
    this.channelPopup = true;
  }

  closePopup() {
    this.channelPopup = false;
  }

  openPrivateMessages() {
    this.showChannelMessages.emit(false);
    this.showPrivateMessages.emit(true);
    this.showDirectMessages.emit(false);
    this.showNewMessage.emit(false);
    this.showThreadSection.emit(false);
    this.hoverStay = false;
  }

  openDirectMessages() {
    this.showChannelMessages.emit(false);
    this.showDirectMessages.emit(true);
    this.showPrivateMessages.emit(false);
    this.showNewMessage.emit(false);
    this.showThreadSection.emit(false);
    this.hoverStay = false;
  }

  openNewMessage() {
    this.showChannelMessages.emit(false);
    this.showNewMessage.emit(true);
    this.showDirectMessages.emit(false);
    this.showPrivateMessages.emit(false);
    this.showThreadSection.emit(false);
    this.hoverStay = false;
  }

  openChannelMessages() {
    this.showChannelMessages.emit(true);
    this.showNewMessage.emit(false);
    this.showDirectMessages.emit(false);
    this.showPrivateMessages.emit(false);
    this.showThreadSection.emit(false);
    this.hoverStay = true;
  }

  hideThreadSection() {
    this.showThreadSection.emit(false);
  }
}
