import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.scss']
})
export class ThreadsComponent {
  mouseOvered = false;
  // @Input()close = true;
  @ViewChild('showThreadSection') showThreadSection = true;

  closeThread() {
    this.showThreadSection = false;
  }
}
