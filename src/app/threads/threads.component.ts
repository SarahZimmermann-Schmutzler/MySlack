import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.scss']
})
export class ThreadsComponent {
  mouseOvered = false;
  @Output() showThreadsSection = new EventEmitter();
  
  closeThread() {
    this.showThreadsSection.emit(false);
  }
}
