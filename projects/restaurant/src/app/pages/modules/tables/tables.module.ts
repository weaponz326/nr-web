import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TablesRoutingModule } from './tables-routing.module';
import { MainNavbarModule } from 'projects/personal/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { TablesPage } from './tables.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllTablesComponent } from './all-tables/all-tables.component';
import { AddTableComponent } from './add-table/add-table.component';
import { ViewTableComponent } from './view-table/view-table.component';
import { TableFormComponent } from './table-form/table-form.component';


@NgModule({
  declarations: [
    TablesPage,
    DashboardComponent,
    AllTablesComponent,
    AddTableComponent,
    ViewTableComponent,
    TableFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    TablesRoutingModule
  ]
})
export class TablesModule { }
