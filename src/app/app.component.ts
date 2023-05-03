import { Component, Input, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MySlack';
  currentUser$: Observable<any>;
  @Input() currentUserId = '';

  constructor(public router: Router, private auth: Auth) { }

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (currentUser$) => {
      if (currentUser$) {
        this.currentUserId = currentUser$.uid;
        // console.log('User id is', this.currentUserId);
      } else {
        this.currentUserId = 'kLLzHS4VI6TDTL2gZUPbRzgOoID3';
        // console.log('Guest id is', this.currentUserId);
        // Guest Login
      }
    });
    
  }
}
