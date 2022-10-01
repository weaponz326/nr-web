import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimetableRoutingModule } from './timetable-routing.module';
import { TimetablePage } from './timetable.page';
import { AllTimetableComponent } from './all-timetable/all-timetable.component';
import { NewTimetableComponent } from './new-timetable/new-timetable.component';
import { ClassTimetableComponent } from './class-timetable/class-timetable.component';
import { EditTimetableComponent } from './edit-timetable/edit-timetable.component';
import { FullTimetableComponent } from './full-timetable/full-timetable.component';
import { AddPeriodComponent } from './add-period/add-period.component';


@NgModule({
  declarations: [
    TimetablePage,
    AllTimetableComponent,
    NewTimetableComponent,
    ClassTimetableComponent,
    EditTimetableComponent,
    FullTimetableComponent,
    AddPeriodComponent
  ],
  imports: [
    CommonModule,
    TimetableRoutingModule
  ]
})
export class TimetableModule { }
