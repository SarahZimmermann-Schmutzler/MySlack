import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PasswordComponent } from './password/password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { WsChannelComponent } from './ws-channel/ws-channel.component';
import { WsDirectComponent } from './ws-direct/ws-direct.component';
import { WsPrivateComponent } from './ws-private/ws-private.component';
import { WsChannelResponsiveComponent } from './ws-channel-responsive/ws-channel-responsive.component';
import { WsPmResponsiveComponent } from './ws-pm-responsive/ws-pm-responsive.component';
import { WsDmResponsiveComponent } from './ws-dm-responsive/ws-dm-responsive.component';
import { ThreadResponsiveComponent } from './thread-responsive/thread-responsive.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'signUp', component: SignUpComponent},
  { path: 'password', component: PasswordComponent},
  { path: 'newpassword', component: NewPasswordComponent},
  { path: 'ws-channel', component: WsChannelComponent},
  { path: 'ws-direct', component: WsDirectComponent},
  { path: 'ws-private', component: WsPrivateComponent},
  { path: 'channel-responsive', component: WsChannelResponsiveComponent},
  { path: 'private-responsive', component: WsPmResponsiveComponent},
  { path: 'direct-responsive', component: WsDmResponsiveComponent},
  { path: 'threads-responsive', component: ThreadResponsiveComponent},
  { path: 'impressum', component: ImpressumComponent},
  { path: 'datenschutz', component: DatenschutzComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
