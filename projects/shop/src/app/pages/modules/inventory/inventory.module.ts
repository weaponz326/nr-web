import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InventoryRoutingModule } from './inventory-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { InventoryPage } from './inventory.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllInventoryComponent } from './all-inventory/all-inventory.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { EditInventoryComponent } from './edit-inventory/edit-inventory.component';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';


@NgModule({
  declarations: [
    InventoryPage,
    DashboardComponent,
    ConfigurationComponent,
    AllInventoryComponent,
    AddInventoryComponent,
    EditInventoryComponent,
    InventoryFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InventoryRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class InventoryModule { }
