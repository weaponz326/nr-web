import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersPage } from './customers.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllCustomersComponent } from './all-customers/all-customers.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';

const routes: Routes = [
  {
    path: "",
    component: CustomersPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "all-customers", component: AllCustomersComponent },
      { path: "new-customer", component: NewCustomerComponent },
      { path: "view-customer", component: ViewCustomerComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
