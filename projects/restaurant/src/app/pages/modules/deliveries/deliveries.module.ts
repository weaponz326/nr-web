import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DeliveriesRoutingModule } from './deliveries-routing.module';
import { MainNavbarModule } from 'projects/personal/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { DeliveriesPage } from './deliveries.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllDeliveriesComponent } from './all-deliveries/all-deliveries.component';
import { NewDeliveryComponent } from './new-delivery/new-delivery.component';
import { EditDeliveryComponent } from './edit-delivery/edit-delivery.component';
import { DeliveryFormComponent } from './delivery-form/delivery-form.component';


@NgModule({
  declarations: [
    DeliveriesPage,
    DashboardComponent,
    AllDeliveriesComponent,
    NewDeliveryComponent,
    EditDeliveryComponent,
    DeliveryFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    DeliveriesRoutingModule
  ]
})
export class DeliveriesModule { }