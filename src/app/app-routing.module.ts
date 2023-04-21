import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginProcessComponent } from './login-process/login-process.component';

const routes: Routes = [
  { path: '', component: LoginProcessComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
