import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExecutivesRoutingModule } from './executives-routing.module';
import { ExecutivesPage } from './executives.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllExecutivesComponent } from './all-executives/all-executives.component';
import { AddExecutiveComponent } from './add-executive/add-executive.component';
import { ViewExecutiveComponent } from './view-executive/view-executive.component';
import { ExecutiveFormComponent } from './executive-form/executive-form.component';


@NgModule({
  declarations: [
    ExecutivesPage,
    DashboardComponent,
    ConfigurationComponent,
    AllExecutivesComponent,
    AddExecutiveComponent,
    ViewExecutiveComponent,
    ExecutiveFormComponent
  ],
  imports: [
    CommonModule,
    ExecutivesRoutingModule
  ]
})
export class ExecutivesModule { }
