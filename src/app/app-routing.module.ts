import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PasswordComponent } from './password/password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { ChannelMessagesComponent } from './channel-messages/channel-messages.component';
import { PrivateMessagesComponent } from './private-messages/private-messages.component';
import { DirectMessagesComponent } from './direct-messages/direct-messages.component';
import { WorkplaceModule } from './workplace/workplace.module';
import { WorkComponent } from './workplace/work/work.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'signUp', component: SignUpComponent},
  { path: 'password', component: PasswordComponent},
  { path: 'newpassword', component: NewPasswordComponent},
  { path: 'workspace', component: WorkspaceComponent},
  { path: 'workplace', component: WorkComponent},
  { path: 'workspace/channels', component: ChannelMessagesComponent},
  { path: 'workspace/dm', component: DirectMessagesComponent},
  { path: 'workspace/pm', component: PrivateMessagesComponent},
  { path: 'workspace/:currentUser', component: WorkspaceComponent},
  { path: 'impressum', component: ImpressumComponent},
  { path: 'datenschutz', component: DatenschutzComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
