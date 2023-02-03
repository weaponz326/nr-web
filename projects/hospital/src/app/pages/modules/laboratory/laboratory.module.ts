import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaboratoryRoutingModule } from './laboratory-routing.module';
import { LaboratoryPage } from './laboratory.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllLabsComponent } from './all-labs/all-labs.component';
import { NewLabComponent } from './new-lab/new-lab.component';
import { ViewLabComponent } from './view-lab/view-lab.component';


@NgModule({
  declarations: [
    LaboratoryPage,
    DashboardComponent,
    ConfigurationComponent,
    AllLabsComponent,
    NewLabComponent,
    ViewLabComponent
  ],
  imports: [
    CommonModule,
    LaboratoryRoutingModule
  ]
})
export class LaboratoryModule { }
