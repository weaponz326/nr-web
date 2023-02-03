import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrescriptionsRoutingModule } from './prescriptions-routing.module';
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
    PrescriptionsRoutingModule
  ]
})
export class PrescriptionsModule { }
