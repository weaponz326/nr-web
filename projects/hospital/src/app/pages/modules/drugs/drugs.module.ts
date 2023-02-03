import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrugsRoutingModule } from './drugs-routing.module';
import { DrugsPage } from './drugs.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllDrugsComponent } from './all-drugs/all-drugs.component';
import { NewDrugComponent } from './new-drug/new-drug.component';
import { ViewDrugComponent } from './view-drug/view-drug.component';
import { DrugFormComponent } from './drug-form/drug-form.component';


@NgModule({
  declarations: [
    DrugsPage,
    DashboardComponent,
    ConfigurationComponent,
    AllDrugsComponent,
    NewDrugComponent,
    ViewDrugComponent,
    DrugFormComponent
  ],
  imports: [
    CommonModule,
    DrugsRoutingModule
  ]
})
export class DrugsModule { }
