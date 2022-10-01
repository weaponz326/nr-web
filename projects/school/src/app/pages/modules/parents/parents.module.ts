import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentsRoutingModule } from './parents-routing.module';
import { ParentsPage } from './parents.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllParentsComponent } from './all-parents/all-parents.component';
import { NewParentComponent } from './new-parent/new-parent.component';
import { ViewParentComponent } from './view-parent/view-parent.component';
import { ParentFormComponent } from './parent-form/parent-form.component';
import { ParentWardsComponent } from './parent-wards/parent-wards.component';


@NgModule({
  declarations: [
    ParentsPage,
    DashboardComponent,
    ConfigurationComponent,
    AllParentsComponent,
    NewParentComponent,
    ViewParentComponent,
    ParentFormComponent,
    ParentWardsComponent
  ],
  imports: [
    CommonModule,
    ParentsRoutingModule
  ]
})
export class ParentsModule { }
