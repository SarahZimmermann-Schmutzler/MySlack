import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-channel-messages',
  templateUrl: './channel-messages.component.html',
  styleUrls: ['./channel-messages.component.scss']
})
export class ChannelMessagesComponent {
  mouseOvered = false;
  mouseOveredTwo = false;
  mouseOveredThree = false;
  @Output() a = new EventEmitter();
  
  openThread() {
    
  }
}
