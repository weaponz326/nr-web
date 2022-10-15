import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FeesRoutingModule } from './fees-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { FeesPage } from './fees.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllFeesComponent } from './all-fees/all-fees.component';
import { CreateFeesComponent } from './create-fees/create-fees.component';
import { ViewFeesComponent } from './view-fees/view-fees.component';
import { FeesFormComponent } from './fees-form/fees-form.component';
import { FeesItemsComponent } from './fees-items/fees-items.component';
import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { AddArrearsComponent } from './add-arrears/add-arrears.component';
import { ClassBillsComponent } from './class-bills/class-bills.component';
import { StudentBillComponent } from './student-bill/student-bill.component';
import { FeesTargetComponent } from './fees-target/fees-target.component';


@NgModule({
  declarations: [
    FeesPage,
    DashboardComponent,
    ConfigurationComponent,
    AllFeesComponent,
    CreateFeesComponent,
    ViewFeesComponent,
    FeesFormComponent,
    FeesItemsComponent,
    AddItemComponent,
    EditItemComponent,
    AddArrearsComponent,
    ClassBillsComponent,
    StudentBillComponent,
    FeesTargetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FeesRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class FeesModule { }
