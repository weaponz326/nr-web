import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillsRoutingModule } from './bills-routing.module';
import { BillsPage } from './bills.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllBillsComponent } from './all-bills/all-bills.component';
import { NewBillComponent } from './new-bill/new-bill.component';
import { ViewBillComponent } from './view-bill/view-bill.component';
import { BillTablesComponent } from './bill-tables/bill-tables.component';
import { GeneralItemsComponent } from './general-items/general-items.component';
import { AddGeneralComponent } from './add-general/add-general.component';
import { AddExtraComponent } from './add-extra/add-extra.component';


@NgModule({
  declarations: [
    BillsPage,
    DashboardComponent,
    ConfigurationComponent,
    AllBillsComponent,
    NewBillComponent,
    ViewBillComponent,
    BillTablesComponent,
    GeneralItemsComponent,
    AddGeneralComponent,
    AddExtraComponent
  ],
  imports: [
    CommonModule,
    BillsRoutingModule
  ]
})
export class BillsModule { }
