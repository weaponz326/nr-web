import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ServicesRoutingModule } from './services-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';
import { GuestsWindowsModule } from '../../../components/select-windows/guests-windows/guests-windows.module';

import { ServicesPage } from './services.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllServicesComponent } from './all-services/all-services.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { ViewServiceComponent } from './view-service/view-service.component';
import { ServiceItemsComponent } from './service-items/service-items.component';
import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ItemFormComponent } from './item-form/item-form.component';


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
    EditItemComponent,
    ItemFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    GuestsWindowsModule
  ]
})
export class ServicesModule { }
