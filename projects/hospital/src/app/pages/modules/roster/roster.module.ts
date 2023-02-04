import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RosterRoutingModule } from './roster-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { RosterPage } from './roster.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllRosterComponent } from './all-roster/all-roster.component';
import { NewRosterComponent } from './new-roster/new-roster.component';
import { ViewRosterComponent } from './view-roster/view-roster.component';
import { RosterSheetComponent } from './roster-sheet/roster-sheet.component';
import { ShiftsComponent } from './shifts/shifts.component';
import { AddShiftComponent } from './add-shift/add-shift.component';
import { EditShiftComponent } from './edit-shift/edit-shift.component';
import { ManageBatchesComponent } from './manage-batches/manage-batches.component';
import { AddBatchComponent } from './add-batch/add-batch.component';
import { EditBatchComponent } from './edit-batch/edit-batch.component';
import { ManageStaffComponent } from './personnel/manage-staff/manage-staff.component';
import { ManageDoctorsComponent } from './personnel/manage-doctors/manage-doctors.component';
import { ManageNursesComponent } from './personnel/manage-nurses/manage-nurses.component';


@NgModule({
  declarations: [
    RosterPage,
    DashboardComponent,
    ConfigurationComponent,
    AllRosterComponent,
    NewRosterComponent,
    ViewRosterComponent,
    RosterSheetComponent,
    ShiftsComponent,
    AddShiftComponent,
    EditShiftComponent,
    ManageBatchesComponent,
    AddBatchComponent,
    EditBatchComponent,
    ManageStaffComponent,
    ManageDoctorsComponent,
    ManageNursesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RosterRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class RosterModule { }
