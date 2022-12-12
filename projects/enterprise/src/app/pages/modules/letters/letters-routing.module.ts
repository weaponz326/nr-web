import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LettersPage } from './letters.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllLettersComponent } from './all-letters/all-letters.component';

const routes: Routes = [
  {
    path: "",
    component: LettersPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "configuration", component: ConfigurationComponent },
      { path: "all-letters", component: AllLettersComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LettersRoutingModule { }
