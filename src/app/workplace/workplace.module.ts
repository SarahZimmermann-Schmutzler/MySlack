import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { WorkComponent } from './work/work.component';
import { ThreadsComponent } from './threads/threads.component';
import { ChannelsComponent } from './channels/channels.component';
import { DirectComponent } from './direct/direct.component';
import { PrivateComponent } from './private/private.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SidenavComponent,
    WorkComponent,
    ThreadsComponent,
    ChannelsComponent,
    DirectComponent,
    PrivateComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule
  ],

  exports: [
    WorkComponent
  ]
})
export class WorkplaceModule { }
