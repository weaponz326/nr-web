import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NursesPage } from './nurses.page';
import { AllNursesComponent } from './all-nurses/all-nurses.component';
import { NewNurseComponent } from './new-nurse/new-nurse.component';
import { ViewNurseComponent } from './view-nurse/view-nurse.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';


const routes: Routes = [
  {
    path: "",
    component: NursesPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "all-nurses", component: AllNursesComponent },
      { path: "new-nurse", component: NewNurseComponent },
      { path: "view-nurse", component: ViewNurseComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NursesRoutingModule { }
