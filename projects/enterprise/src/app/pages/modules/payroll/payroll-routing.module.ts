import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PayrollPage } from './payroll.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllPayrollComponent } from './all-payroll/all-payroll.component';
import { ViewPayrollComponent } from './view-payroll/view-payroll.component';
import { EmployeePayrollComponent } from './employee-payroll/employee-payroll.component';

const routes: Routes = [
  {
    path: "",
    component: PayrollPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "configuration", component: ConfigurationComponent },
      { path: "all-payroll", component: AllPayrollComponent },
      { path: "view-payroll", component: ViewPayrollComponent },
      { path: "employee-payroll", component: EmployeePayrollComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }
