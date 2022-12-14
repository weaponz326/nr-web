import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppraisalRoutingModule } from './appraisal-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { AppraisalPage } from './appraisal.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllAppraisalComponent } from './all-appraisal/all-appraisal.component';
import { NewAppraisalComponent } from './new-appraisal/new-appraisal.component';
import { ViewAppraisalComponent } from './view-appraisal/view-appraisal.component';
import { AppraisalFormComponent } from './appraisal-form/appraisal-form.component';
import { AppraisalEmployeesComponent } from './appraisal-employees/appraisal-employees.component';
import { AppraisalSheetComponent } from './appraisal-sheet/appraisal-sheet.component';


@NgModule({
  declarations: [
    AppraisalPage,
    DashboardComponent,
    ConfigurationComponent,
    AllAppraisalComponent,
    NewAppraisalComponent,
    ViewAppraisalComponent,
    AppraisalFormComponent,
    AppraisalEmployeesComponent,
    AppraisalSheetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppraisalRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class AppraisalModule { }
