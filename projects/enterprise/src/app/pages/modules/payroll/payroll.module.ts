import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollRoutingModule } from './payroll-routing.module';
import { PayrollPage } from './payroll.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllPayrollComponent } from './all-payroll/all-payroll.component';
import { GeneratePayrollComponent } from './generate-payroll/generate-payroll.component';
import { ViewPayrollComponent } from './view-payroll/view-payroll.component';
import { PayrollSheetComponent } from './payroll-sheet/payroll-sheet.component';
import { EmployeePayrollComponent } from './employee-payroll/employee-payroll.component';


@NgModule({
  declarations: [
    PayrollPage,
    DashboardComponent,
    ConfigurationComponent,
    AllPayrollComponent,
    GeneratePayrollComponent,
    ViewPayrollComponent,
    PayrollSheetComponent,
    EmployeePayrollComponent
  ],
  imports: [
    CommonModule,
    PayrollRoutingModule
  ]
})
export class PayrollModule { }
