import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LaboratoryRoutingModule } from './laboratory-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { AdmissionsWindowsModule } from '../../../components/select-windows/admissions-windows/admissions-windows.module';

import { LaboratoryPage } from './laboratory.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllLabsComponent } from './all-labs/all-labs.component';
import { NewLabComponent } from './new-lab/new-lab.component';
import { ViewLabComponent } from './view-lab/view-lab.component';
import { LabAttachmentsComponent } from './lab-attachments/lab-attachments.component';


@NgModule({
  declarations: [
    LaboratoryPage,
    DashboardComponent,
    ConfigurationComponent,
    AllLabsComponent,
    NewLabComponent,
    ViewLabComponent,
    LabAttachmentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LaboratoryRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    AdmissionsWindowsModule
  ]
})
export class LaboratoryModule { }
