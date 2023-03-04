import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModuleHomePage } from './module-home.page';

const routes: Routes = [
  { path: "", component: ModuleHomePage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleHomeRoutingModule { }
