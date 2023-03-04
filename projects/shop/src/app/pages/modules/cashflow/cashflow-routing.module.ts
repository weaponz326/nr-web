import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CashflowPage } from './cashflow.page';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllSheetsComponent } from './all-sheets/all-sheets.component';
import { ViewSheetComponent } from './view-sheet/view-sheet.component';

const routes: Routes = [
  {
    path: "",
    component: CashflowPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "all-cashflow", component: AllSheetsComponent },
      { path: "view-sheet", component: ViewSheetComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashflowRoutingModule { }
