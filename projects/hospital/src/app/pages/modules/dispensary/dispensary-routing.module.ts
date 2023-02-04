import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DispensaryPage } from './dispensary.page';
import { AllDispensesComponent } from './all-dispenses/all-dispenses.component';
import { NewDispenseComponent } from './new-dispense/new-dispense.component';
import { ViewDispenseComponent } from './view-dispense/view-dispense.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';


const routes: Routes = [
  {
    path: "",
    component: DispensaryPage,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "all-dispenses", component: AllDispensesComponent },
      { path: "new-dispense", component: NewDispenseComponent },
      { path: "view-dispense", component: ViewDispenseComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DispensaryRoutingModule { }
