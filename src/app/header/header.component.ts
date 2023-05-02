import { Component, Input } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  @Input() logoMode = true;
  @Input() workspaceMode = true;
  @Input() workspaceModeUser = true;
  logoutPopup = false;
  mouseOvered = false;
  mouseOveredTwo = false;

  constructor(private router: Router, private auth: Auth) { }

  openPopup() {
    this.logoutPopup = true;
  }

  closePopup() {
    this.logoutPopup = false;
  }

  logout() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/']);
    })
  }

  GuestLogout() {
    this.router.navigate(['/']);
  }
  
}
