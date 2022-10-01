import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessmentRoutingModule } from './assessment-routing.module';
import { AssessmentPage } from './assessment.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllAssessmentComponent } from './all-assessment/all-assessment.component';
import { NewAssessmentComponent } from './new-assessment/new-assessment.component';
import { ViewAssessmentComponent } from './view-assessment/view-assessment.component';
import { AssessmentFormComponent } from './assessment-form/assessment-form.component';
import { AssessmentSheetComponent } from './assessment-sheet/assessment-sheet.component';


@NgModule({
  declarations: [
    AssessmentPage,
    DashboardComponent,
    ConfigurationComponent,
    AllAssessmentComponent,
    NewAssessmentComponent,
    ViewAssessmentComponent,
    AssessmentFormComponent,
    AssessmentSheetComponent
  ],
  imports: [
    CommonModule,
    AssessmentRoutingModule
  ]
})
export class AssessmentModule { }
