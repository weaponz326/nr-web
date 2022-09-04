import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveriesRoutingModule } from './deliveries-routing.module';
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
    DeliveriesRoutingModule
  ]
})
export class DeliveriesModule { }
