import { Component } from '@angular/core';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent {
 showThreadsSection: boolean = true;
 showChannelMessages = true;
 showPrivateMessages = false;
 showDirectMessages = false;
 showNewMessage = false;
 
 setVariableFalse($event: any) {
  this.showThreadsSection = $event;
 }

 setVariableTrue($event) {
  console.log($event);
  this.showThreadsSection = $event;
 }

 showDirectMessagesSection($event) {
  console.log($event)
  this.showDirectMessages = $event;
 }

 hideChannelMessagesSection($event) {
  this.showChannelMessages = $event;
 }

 showPrivateMessagesSection($event) {
  this.showPrivateMessages = $event;
 }

 showNewMessageSection($event) {
  this.showNewMessage = $event;
 }

 hideThreadSection($event) {
  this.showThreadsSection = $event;
 }
}
