import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesPage } from './services.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllServicesComponent } from './all-services/all-services.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { ViewServiceComponent } from './view-service/view-service.component';
import { ServiceItemsComponent } from './service-items/service-items.component';
import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';


@NgModule({
  declarations: [
    ServicesPage,
    DashboardComponent,
    ConfigurationComponent,
    AllServicesComponent,
    AddServiceComponent,
    ViewServiceComponent,
    ServiceItemsComponent,
    AddItemComponent,
    EditItemComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule
  ]
})
export class ServicesModule { }
