import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LessonPlanRoutingModule } from './lesson-plan-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

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
    FormsModule,
    ReactiveFormsModule,
    LessonPlanRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class LessonPlanModule { }
