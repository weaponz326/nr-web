import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvoicePage } from './invoice.page';
import { AllInvoiceComponent } from './all-invoice/all-invoice.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';

const routes: Routes = [
  {
    path: "",
    component: InvoicePage,
    children: [
      { path: "", component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "all-invoice", component: AllInvoiceComponent },
      { path: "view-invoice", component: ViewInvoiceComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
