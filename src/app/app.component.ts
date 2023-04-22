import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MySlack';
  login = false;

  ngOnInit(): void {
    this.login = false;
  }

  signUpHeader() {
    this.login = true;
  }
}
