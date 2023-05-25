import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './private/private.component';
import { DirectComponent } from './direct/direct.component';
import { WorkComponent } from './work/work.component';

const routes: Routes = [
  { path: 'workplace', component: WorkComponent},
  { path: 'pm', component: PrivateComponent},
  { path: 'dm', component: DirectComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
