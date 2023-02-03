import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DispensaryRoutingModule } from './dispensary-routing.module';
import { DispensaryPage } from './dispensary.page';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllDispensesComponent } from './all-dispenses/all-dispenses.component';
import { NewDispenseComponent } from './new-dispense/new-dispense.component';
import { ViewDispenseComponent } from './view-dispense/view-dispense.component';
import { DispenseItemsComponent } from './dispense-items/dispense-items.component';
import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ItemFormComponent } from './item-form/item-form.component';


@NgModule({
  declarations: [
    DispensaryPage,
    ConfigurationComponent,
    DashboardComponent,
    AllDispensesComponent,
    NewDispenseComponent,
    ViewDispenseComponent,
    DispenseItemsComponent,
    AddItemComponent,
    EditItemComponent,
    ItemFormComponent
  ],
  imports: [
    CommonModule,
    DispensaryRoutingModule
  ]
})
export class DispensaryModule { }
