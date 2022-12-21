import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TimetableRoutingModule } from './timetable-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { TimetablePage } from './timetable.page';
import { AllTimetableComponent } from './all-timetable/all-timetable.component';
import { NewTimetableComponent } from './new-timetable/new-timetable.component';
import { ClassTimetableComponent } from './class-timetable/class-timetable.component';
import { EditTimetableComponent } from './edit-timetable/edit-timetable.component';
import { FullTimetableComponent } from './full-timetable/full-timetable.component';
import { AddPeriodComponent } from './add-period/add-period.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { TimetableFormComponent } from './timetable-form/timetable-form.component';
import { TimetableSheetComponent } from './timetable-sheet/timetable-sheet.component';
import { TimetableClassesComponent } from './timetable-classes/timetable-classes.component';


@NgModule({
  declarations: [
    TimetablePage,
    AllTimetableComponent,
    NewTimetableComponent,
    ClassTimetableComponent,
    EditTimetableComponent,
    FullTimetableComponent,
    AddPeriodComponent,
    DashboardComponent,
    ConfigurationComponent,
    TimetableFormComponent,
    TimetableSheetComponent,
    TimetableClassesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TimetableRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class TimetableModule { }
