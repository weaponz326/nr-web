import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonPlanRoutingModule } from './lesson-plan-routing.module';
import { LessonPlanPage } from './lesson-plan.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllPlansComponent } from './all-plans/all-plans.component';
import { NewPlanComponent } from './new-plan/new-plan.component';
import { ViewPlanComponent } from './view-plan/view-plan.component';
import { PlanFormComponent } from './plan-form/plan-form.component';
import { PlanSheetComponent } from './plan-sheet/plan-sheet.component';


@NgModule({
  declarations: [
    LessonPlanPage,
    DashboardComponent,
    ConfigurationComponent,
    AllPlansComponent,
    NewPlanComponent,
    ViewPlanComponent,
    PlanFormComponent,
    PlanSheetComponent
  ],
  imports: [
    CommonModule,
    LessonPlanRoutingModule
  ]
})
export class LessonPlanModule { }
