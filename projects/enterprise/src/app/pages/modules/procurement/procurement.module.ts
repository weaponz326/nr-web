import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProcurementRoutingModule } from './procurement-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { ProcurementPage } from './procurement.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllProcurementComponent } from './all-procurement/all-procurement.component';
import { NewProcurementComponent } from './new-procurement/new-procurement.component';
import { ViewProcurementComponent } from './view-procurement/view-procurement.component';
import { ProcurementFormComponent } from './procurement-form/procurement-form.component';
import { OrderReviewComponent } from './order-review/order-review.component';


@NgModule({
  declarations: [
    ProcurementPage,
    DashboardComponent,
    ConfigurationComponent,
    AllProcurementComponent,
    NewProcurementComponent,
    ViewProcurementComponent,
    ProcurementFormComponent,
    OrderReviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProcurementRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class ProcurementModule { }
