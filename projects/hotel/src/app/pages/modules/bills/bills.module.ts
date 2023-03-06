import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BillsRoutingModule } from './bills-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { GuestsWindowsModule } from '../../../components/select-windows/guests-windows/guests-windows.module';
import { CheckinWindowsModule } from '../../../components/select-windows/checkin-windows/checkin-windows.module';
import { ServicesWindowsModule } from '../../../components/select-windows/services-windows/services-windows.module';

import { BillsPage } from './bills.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllBillsComponent } from './all-bills/all-bills.component';
import { NewBillComponent } from './new-bill/new-bill.component';
import { ViewBillComponent } from './view-bill/view-bill.component';
import { BillTablesComponent } from './bill-tables/bill-tables.component';


@NgModule({
  declarations: [
    BillsPage,
    DashboardComponent,
    ConfigurationComponent,
    AllBillsComponent,
    NewBillComponent,
    ViewBillComponent,
    BillTablesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BillsRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    GuestsWindowsModule,
    CheckinWindowsModule,
    ServicesWindowsModule
  ]
})
export class BillsModule { }
