import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DoctorsRoutingModule } from './doctors-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { DoctorsPage } from './doctors.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllDoctorsComponent } from './all-doctors/all-doctors.component';
import { NewDoctorComponent } from './new-doctor/new-doctor.component';
import { ViewDoctorComponent } from './view-doctor/view-doctor.component';
import { DoctorFormComponent } from './doctor-form/doctor-form.component';


@NgModule({
  declarations: [
    DoctorsPage,
    DashboardComponent,
    ConfigurationComponent,
    AllDoctorsComponent,
    NewDoctorComponent,
    ViewDoctorComponent,
    DoctorFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DoctorsRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class DoctorsModule { }
