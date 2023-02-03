import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NursesRoutingModule } from './nurses-routing.module';
import { NursesPage } from './nurses.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllNursesComponent } from './all-nurses/all-nurses.component';
import { NewNurseComponent } from './new-nurse/new-nurse.component';
import { ViewNurseComponent } from './view-nurse/view-nurse.component';
import { NurseFormComponent } from './nurse-form/nurse-form.component';


@NgModule({
  declarations: [
    NursesPage,
    DashboardComponent,
    ConfigurationComponent,
    AllNursesComponent,
    NewNurseComponent,
    ViewNurseComponent,
    NurseFormComponent
  ],
  imports: [
    CommonModule,
    NursesRoutingModule
  ]
})
export class NursesModule { }
