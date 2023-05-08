import { Component } from '@angular/core';

@Component({
  selector: 'app-direct-messages',
  templateUrl: './direct-messages.component.html',
  styleUrls: ['./direct-messages.component.scss']
})
export class DirectMessagesComponent {
  mouseOvered = false;
  mouseOveredTwo = false;
  mouseOveredThree = false;
  profilePopup = false;

  openProfilePopup() {
    this.profilePopup = true;
  }

  closeProfilePopup() {
    this.profilePopup = false;
  }
}