import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AssessmentRoutingModule } from './assessment-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { AssessmentPage } from './assessment.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllAssessmentComponent } from './all-assessment/all-assessment.component';
import { NewAssessmentComponent } from './new-assessment/new-assessment.component';
import { ViewAssessmentComponent } from './view-assessment/view-assessment.component';
import { AssessmentFormComponent } from './assessment-form/assessment-form.component';
import { AssessmentSheetComponent } from './assessment-sheet/assessment-sheet.component';
import { AssessmentClassesComponent } from './assessment-classes/assessment-classes.component';


@NgModule({
  declarations: [
    AssessmentPage,
    DashboardComponent,
    ConfigurationComponent,
    AllAssessmentComponent,
    NewAssessmentComponent,
    ViewAssessmentComponent,
    AssessmentFormComponent,
    AssessmentSheetComponent,
    AssessmentClassesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AssessmentRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class AssessmentModule { }
