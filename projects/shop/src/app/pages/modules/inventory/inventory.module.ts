import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
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
    InventoryRoutingModule
  ]
})
export class InventoryModule { }
