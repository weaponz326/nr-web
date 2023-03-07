import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrescriptionsRoutingModule } from './prescriptions-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { AdmissionsWindowsModule } from '../../../components/select-windows/admissions-windows/admissions-windows.module';

import { PrescriptionsPage } from './prescriptions.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllPrescriptionsComponent } from './all-prescriptions/all-prescriptions.component';
import { NewPrescriptionComponent } from './new-prescription/new-prescription.component';
import { ViewPrescriptionComponent } from './view-prescription/view-prescription.component';
import { PrescriptionItemsComponent } from './prescription-items/prescription-items.component';
import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ItemFormComponent } from './item-form/item-form.component';


@NgModule({
  declarations: [
    PrescriptionsPage,
    DashboardComponent,
    ConfigurationComponent,
    AllPrescriptionsComponent,
    NewPrescriptionComponent,
    ViewPrescriptionComponent,
    PrescriptionItemsComponent,
    AddItemComponent,
    EditItemComponent,
    ItemFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrescriptionsRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    AdmissionsWindowsModule
  ]
})
export class PrescriptionsModule { }
