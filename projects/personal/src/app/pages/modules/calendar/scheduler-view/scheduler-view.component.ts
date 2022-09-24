import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { AddScheduleComponent } from '../add-schedule/add-schedule.component';
import { EditScheduleComponent } from '../edit-schedule/edit-schedule.component';


const DAY_MS = 60 * 60 * 24 * 1000;

@Component({
  selector: 'app-scheduler-view',
  templateUrl: './scheduler-view.component.html',
  styleUrls: ['./scheduler-view.component.scss']
})
export class SchedulerViewComponent implements OnInit {

  constructor() { }

  @Output() selected = new EventEmitter();

  @ViewChild('addScheduleComponentReference', { read: AddScheduleComponent, static: false }) addSchedule!: AddScheduleComponent;
  @ViewChild('editScheduleComponentReference', { read: EditScheduleComponent, static: false }) editSchedule!: EditScheduleComponent;

  array = Array;
  math = Math;

  dates: Array<Date> = [];
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  currentDate = new Date();

  calendarMonthYear = "";

  ngOnInit(): void {
    this.setCalendarDays(this.currentDate);
  }

  setMonth(inc: any) {
    const [year, month] = [this.currentDate.getFullYear(), this.currentDate.getMonth()];
    this.currentDate = new Date(year, month + inc, 1);
    this.setCalendarDays(this.currentDate);
  }
  
  setCalendarDays(date = new Date) {
    const [year, month] = [date.getFullYear(), date.getMonth()];
    this.calendarMonthYear = this.months[month] + " " + year;

    const calendarStartTime =  this.getCalendarStartDay(date).getTime();

    this.dates = this.range(0, 41).map(num => new Date(calendarStartTime + DAY_MS * num));
  }

  getCalendarStartDay(date = new Date) {
    const [year, month] = [date.getFullYear(), date.getMonth()];
    const firstDayOfMonth = new Date(year, month, 1).getTime();

    return this.range(1,7)
      .map(num => new Date(firstDayOfMonth - DAY_MS * num))
      .find(dt => dt.getDay() === 0) as Date
  }

  range(start: any, end: any, length = end - start + 1) {
    return Array.from({ length }, (_, i) => start + i)
  }

}
