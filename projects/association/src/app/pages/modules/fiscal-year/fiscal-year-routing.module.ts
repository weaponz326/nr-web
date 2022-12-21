import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FiscalYearPage } from './fiscal-year.page';
import { ViewYearComponent } from './view-year/view-year.component';
import { AddYearComponent } from './add-year/add-year.component';
import { AllYearsComponent } from './all-years/all-years.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "",
    component: FiscalYearPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "configuration", component: ConfigurationComponent },
      { path: "all-years", component: AllYearsComponent },
      { path: "add-year", component: AddYearComponent },
      { path: "view-year", component: ViewYearComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiscalYearRoutingModule { }
