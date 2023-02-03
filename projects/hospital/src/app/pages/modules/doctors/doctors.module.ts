import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorsRoutingModule } from './doctors-routing.module';
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
    DoctorsRoutingModule
  ]
})
export class DoctorsModule { }
