import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PasswordComponent } from './password/password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { WorkspaceComponent } from './workspace/workspace.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'signUp', component: SignUpComponent},
  { path: 'password', component: PasswordComponent},
  { path: 'newpassword', component: NewPasswordComponent},
  { path: 'workspace', component: WorkspaceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
