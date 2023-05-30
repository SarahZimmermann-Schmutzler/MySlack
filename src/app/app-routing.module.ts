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

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'signUp', component: SignUpComponent},
  { path: 'password', component: PasswordComponent},
  { path: 'newpassword', component: NewPasswordComponent},
  { path: 'ws-channel', component: WsChannelComponent},
  { path: 'ws-direct', component: WsDirectComponent},
  { path: 'ws-private', component: WsPrivateComponent},
  { path: 'impressum', component: ImpressumComponent},
  { path: 'datenschutz', component: DatenschutzComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
