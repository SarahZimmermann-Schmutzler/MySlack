import { Component } from '@angular/core';
import { Firestore, collection, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-ws-private',
  templateUrl: './ws-private.component.html',
  styleUrls: ['./ws-private.component.scss']
})

export class WsPrivateComponent {
  showThreadsSection: boolean = true;
  showChannelMessages = true;
  showPrivateMessages = false;
  showDirectMessages = false;
  showNewMessage = false;
  showSidenav = true;
  currentUser = '';
  userName = '';
  userPic = '';
  user$: Observable<any>;
  coll = collection(this.firestore, 'users');
  fullSize = true;
 

  constructor(public firestore: Firestore, private service: ServiceService) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');
    // console.log(this.currentUser);
    this.getCurrentUserData();
  }


  getCurrentUserData() {
    const docRef = doc(this.coll, this.currentUser);
    this.user$ = docData(docRef);
    this.user$.subscribe(currentUser => {
      this.userName = currentUser.name;
      this.userPic = currentUser.pic;
    })
  }

  
  resizeSidenav($event) {
    this.fullSize = $event;
  }
}
