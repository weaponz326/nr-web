import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
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
    TablesRoutingModule
  ]
})
export class TablesModule { }
