import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-private-messages',
  templateUrl: './private-messages.component.html',
  styleUrls: ['./private-messages.component.scss']
})
export class PrivateMessagesComponent {
  mouseOvered = false;
  mouseOveredTwo = false;
  mouseOveredThree = false;
  profilePopup = false;
  @Input() userName;

  openProfilePopup() {
    this.profilePopup = true;
  }

  closeProfilePopup() {
    this.profilePopup = false;
  }
}
