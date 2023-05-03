import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  rotateChannel = false;
  rotateMessage = false;
  hideChannel = false;

  openChannel() {
    console.log('Channel');
    this.rotateChannel = !this.rotateChannel;
    this.hideChannel = !this.hideChannel;
    
  }

  openDirectMessages() {
    console.log('Message');
    this.rotateMessage = !this.rotateMessage;
  }
}
