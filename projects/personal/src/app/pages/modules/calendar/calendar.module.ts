import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CalendarRoutingModule } from './calendar-routing.module';
import { MainNavbarModule } from '../../../components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from '../../../components/module-utilities/module-utilities.module';

import { CalendarPage } from './calendar.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewCalendarComponent } from './view-calendar/view-calendar.component';
import { NewCalendarComponent } from './new-calendar/new-calendar.component';
import { AllCalendarComponent } from './all-calendar/all-calendar.component';
import { SchedulerViewComponent } from './scheduler-view/scheduler-view.component';
import { AllSchedulesComponent } from './all-schedules/all-schedules.component';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { EditScheduleComponent } from './edit-schedule/edit-schedule.component';


@NgModule({
  declarations: [
    CalendarPage,
    DashboardComponent,
    ViewCalendarComponent,
    NewCalendarComponent,
    AllCalendarComponent,
    SchedulerViewComponent,
    AllSchedulesComponent,
    AddScheduleComponent,
    EditScheduleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class CalendarModule { }
