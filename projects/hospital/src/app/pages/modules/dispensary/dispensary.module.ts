import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DispensaryRoutingModule } from './dispensary-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { AdmissionsWindowsModule } from '../../../components/select-windows/admissions-windows/admissions-windows.module';
import { DrugsWindowsModule } from '../../../components/select-windows/drugs-windows/drugs-windows.module';

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
import { DispensePrescriptionComponent } from './dispense-prescription/dispense-prescription.component';


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
    ItemFormComponent,
    DispensePrescriptionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DispensaryRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    AdmissionsWindowsModule,
    DrugsWindowsModule
  ]
})
export class DispensaryModule { }
