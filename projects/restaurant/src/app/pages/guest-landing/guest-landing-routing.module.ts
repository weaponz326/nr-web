import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuestLandingPage } from './guest-landing.page';

const routes: Routes = [
  { path: "", component: GuestLandingPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestLandingRoutingModule { }
