import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-responsive-new-user',
  templateUrl: './responsive-new-user.component.html',
  styleUrls: ['./responsive-new-user.component.scss']
})
export class ResponsiveNewUserComponent {
  @Input() logoMode = true;

  constructor(private router: Router) {

  }
}
