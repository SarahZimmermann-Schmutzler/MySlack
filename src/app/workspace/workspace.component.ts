import { Component } from '@angular/core';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent {
 showThreadsSection: boolean = true;
 
 setVariableFalse($event: any) {
  this.showThreadsSection = $event;
 }

 setVariableTrue($event) {
  console.log($event);
  this.showThreadsSection = $event;
 }
}
