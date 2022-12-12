import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesPage } from './employees.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllEmployeesComponent } from './all-employees/all-employees.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';


@NgModule({
  declarations: [
    EmployeesPage,
    DashboardComponent,
    ConfigurationComponent,
    AllEmployeesComponent,
    NewEmployeeComponent,
    ViewEmployeeComponent,
    EmployeeFormComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule
  ]
})
export class EmployeesModule { }
