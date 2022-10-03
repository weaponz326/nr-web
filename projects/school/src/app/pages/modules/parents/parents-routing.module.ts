import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ParentsPage } from './parents.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllParentsComponent } from './all-parents/all-parents.component';
import { NewParentComponent } from './new-parent/new-parent.component';
import { ViewParentComponent } from './view-parent/view-parent.component';
import { ConfigurationComponent } from './configuration/configuration.component';

const routes: Routes = [
  {
    path: "",
    component: ParentsPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "all-parents", component: AllParentsComponent },
      { path: "new-parent", component: NewParentComponent },
      { path: "view-parent", component: ViewParentComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentsRoutingModule { }
