import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceivablesRoutingModule } from './receivables-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllReceivablesComponent } from './all-receivables/all-receivables.component';
import { AddReceivableComponent } from './add-receivable/add-receivable.component';
import { EditReceivableComponent } from './edit-receivable/edit-receivable.component';
import { ReceivableFormComponent } from './receivable-form/receivable-form.component';
import { ReceivablesPage } from './receivables.page';


@NgModule({
  declarations: [
    DashboardComponent,
    ConfigurationComponent,
    AllReceivablesComponent,
    AddReceivableComponent,
    EditReceivableComponent,
    ReceivableFormComponent,
    ReceivablesPage
  ],
  imports: [
    CommonModule,
    ReceivablesRoutingModule
  ]
})
export class ReceivablesModule { }
