import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLandingPage } from './main-landing.page';

const routes: Routes = [
  { path: "", component: MainLandingPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLandingRoutingModule { }
