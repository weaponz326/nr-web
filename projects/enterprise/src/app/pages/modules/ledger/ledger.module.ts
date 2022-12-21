import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LedgerRoutingModule } from './ledger-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

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
    FormsModule,
    ReactiveFormsModule,
    LedgerRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class LedgerModule { }
