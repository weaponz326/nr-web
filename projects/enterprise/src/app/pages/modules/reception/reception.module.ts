import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReceptionRoutingModule } from './reception-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { ReceptionPage } from './reception.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllVisitorsComponent } from './all-visitors/all-visitors.component';
import { AddVisitorComponent } from './add-visitor/add-visitor.component';
import { EditVisitorComponent } from './edit-visitor/edit-visitor.component';
import { VisitorFormComponent } from './visitor-form/visitor-form.component';


@NgModule({
  declarations: [
    ReceptionPage,
    DashboardComponent,
    ConfigurationComponent,
    AllVisitorsComponent,
    AddVisitorComponent,
    EditVisitorComponent,
    VisitorFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReceptionRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class ReceptionModule { }
