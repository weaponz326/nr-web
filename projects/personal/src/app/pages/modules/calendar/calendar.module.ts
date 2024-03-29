import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CalendarRoutingModule } from './calendar-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
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
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';
import { ConfigurationComponent } from './configuration/configuration.component';


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
    EditScheduleComponent,
    ScheduleFormComponent,
    ConfigurationComponent
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
