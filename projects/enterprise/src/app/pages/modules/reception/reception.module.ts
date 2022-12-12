import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionRoutingModule } from './reception-routing.module';
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
    ReceptionRoutingModule
  ]
})
export class ReceptionModule { }
