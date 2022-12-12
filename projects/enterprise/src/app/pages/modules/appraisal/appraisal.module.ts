import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppraisalRoutingModule } from './appraisal-routing.module';
import { AppraisalPage } from './appraisal.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllAppraisalComponent } from './all-appraisal/all-appraisal.component';
import { NewAppraisalComponent } from './new-appraisal/new-appraisal.component';
import { ViewAppraisalComponent } from './view-appraisal/view-appraisal.component';
import { AppraisalFormComponent } from './appraisal-form/appraisal-form.component';
import { AppraisalEmployeesComponent } from './appraisal-employees/appraisal-employees.component';


@NgModule({
  declarations: [
    AppraisalPage,
    DashboardComponent,
    ConfigurationComponent,
    AllAppraisalComponent,
    NewAppraisalComponent,
    ViewAppraisalComponent,
    AppraisalFormComponent,
    AppraisalEmployeesComponent
  ],
  imports: [
    CommonModule,
    AppraisalRoutingModule
  ]
})
export class AppraisalModule { }
