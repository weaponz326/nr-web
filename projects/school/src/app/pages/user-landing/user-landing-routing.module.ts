import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserLandingPage } from './user-landing.page';

const routes: Routes = [
  { path: "", component: UserLandingPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLandingRoutingModule { }
