import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RosterRoutingModule } from './roster-routing.module';
import { MainNavbarModule } from 'projects/personal/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';
import { StaffWindowsModule } from '../../../components/select-windows/staff-windows/staff-windows.module';

import { RosterPage } from './roster.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllRosterComponent } from './all-roster/all-roster.component';
import { NewRosterComponent } from './new-roster/new-roster.component';
import { ViewRosterComponent } from './view-roster/view-roster.component';
import { RosterSheetComponent } from './roster-sheet/roster-sheet.component';
import { ShiftsComponent } from './shifts/shifts.component';
import { AddShiftComponent } from './add-shift/add-shift.component';
import { EditShiftComponent } from './edit-shift/edit-shift.component';
import { ManagePersonnelComponent } from './manage-personnel/manage-personnel.component';
import { AddPersonnelComponent } from './add-personnel/add-personnel.component';
import { EditPersonnelComponent } from './edit-personnel/edit-personnel.component';
import { ManageBatchesComponent } from './manage-batches/manage-batches.component';
import { AddBatchComponent } from './add-batch/add-batch.component';
import { EditBatchComponent } from './edit-batch/edit-batch.component';


@NgModule({
  declarations: [
    RosterPage,
    DashboardComponent,
    AllRosterComponent,
    NewRosterComponent,
    ViewRosterComponent,
    RosterSheetComponent,
    ShiftsComponent,
    AddShiftComponent,
    EditShiftComponent,
    ManagePersonnelComponent,
    AddPersonnelComponent,
    EditPersonnelComponent,
    ManageBatchesComponent,
    AddBatchComponent,
    EditBatchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RosterRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    StaffWindowsModule
  ]
})
export class RosterModule { }
