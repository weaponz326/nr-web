import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NursesRoutingModule } from './nurses-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

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
    FormsModule,
    ReactiveFormsModule,
    NursesRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class NursesModule { }
