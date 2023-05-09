import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-channel-messages',
  templateUrl: './channel-messages.component.html',
  styleUrls: ['./channel-messages.component.scss']
})
export class ChannelMessagesComponent {
  mouseOvered = false;
  mouseOveredTwo = false;
  mouseOveredThree = false;
  channelPopup = false;
  @Output() showThreadsSection = new EventEmitter();
  @Input() userName;
  
  openThread() {
    this.showThreadsSection.emit(true);
  }

  editChannel() {
    this.channelPopup = true;
  }

  closePopup() {
    this.channelPopup = false;
  }
}
