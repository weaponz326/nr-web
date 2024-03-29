import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TablesPage } from './tables.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllTablesComponent } from './all-tables/all-tables.component';

import { ConfigAccessGuard } from '../../../guards/access/config-access/config-access.guard';

const routes: Routes = [
  {
    path: "",
    component: TablesPage,
    children: [
      { path: "", component: AllTablesComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "configuration", component: ConfigurationComponent, canActivate: [ConfigAccessGuard] },
      { path: "all-tables", component: AllTablesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule { }
