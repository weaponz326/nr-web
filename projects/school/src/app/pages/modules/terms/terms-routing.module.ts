import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TermsPage } from './terms.page';
import { AllTermsComponent } from './all-terms/all-terms.component';
import { NewTermComponent } from './new-term/new-term.component';
import { ViewTermComponent } from './view-term/view-term.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';


const routes: Routes = [
  {
    path: "",
    component: TermsPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "all-terms", component: AllTermsComponent },
      { path: "new-term", component: NewTermComponent },
      { path: "view-term", component: ViewTermComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsRoutingModule { }
