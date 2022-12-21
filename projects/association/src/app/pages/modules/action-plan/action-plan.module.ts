import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ActionPlanRoutingModule } from './action-plan-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { ActionPlanPage } from './action-plan.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllPlansComponent } from './all-plans/all-plans.component';
import { NewPlanComponent } from './new-plan/new-plan.component';
import { ViewPlanComponent } from './view-plan/view-plan.component';
import { PlanStepsComponent } from './plan-steps/plan-steps.component';
import { AddStepComponent } from './add-step/add-step.component';
import { EditStepComponent } from './edit-step/edit-step.component';


@NgModule({
  declarations: [
    ActionPlanPage,
    DashboardComponent,
    ConfigurationComponent,
    AllPlansComponent,
    NewPlanComponent,
    ViewPlanComponent,
    PlanStepsComponent,
    AddStepComponent,
    EditStepComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ActionPlanRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule
  ]
})
export class ActionPlanModule { }
