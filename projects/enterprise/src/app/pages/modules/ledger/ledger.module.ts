import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LedgerRoutingModule } from './ledger-routing.module';
import { LedgerPage } from './ledger.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllLedgerComponent } from './all-ledger/all-ledger.component';
import { NewLedgerComponent } from './new-ledger/new-ledger.component';
import { ViewLedgerComponent } from './view-ledger/view-ledger.component';
import { LedgerTableComponent } from './ledger-table/ledger-table.component';
import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ItemFormComponent } from './item-form/item-form.component';


@NgModule({
  declarations: [
    LedgerPage,
    DashboardComponent,
    ConfigurationComponent,
    AllLedgerComponent,
    NewLedgerComponent,
    ViewLedgerComponent,
    LedgerTableComponent,
    AddItemComponent,
    EditItemComponent,
    ItemFormComponent
  ],
  imports: [
    CommonModule,
    LedgerRoutingModule
  ]
})
export class LedgerModule { }
