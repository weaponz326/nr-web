import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie.service';
import { CalendarApiService } from 'projects/personal/src/app/services/modules-api/calendar-api/calendar-api.service';

import { Calendar } from 'projects/personal/src/app/models/modules/calendar/calendar.model';


@Component({
  selector: 'app-view-calendar',
  templateUrl: './view-calendar.component.html',
  styleUrls: ['./view-calendar.component.scss']
})
export class ViewCalendarComponent implements OnInit {

  constructor(
    private customCookie: CustomCookieService,
    private calendarApi: CalendarApiService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Calendars", url: "/home/calendar/all-calendar" },
    { text: "View Calendar", url: "/home/calendar/view-calendar" },
  ];

  calendarFormData: any;

  isCalendarLoading: boolean = false;
  isCalendarSaving: boolean = false;

  calendarForm = new FormGroup({
    calendarName: new FormControl('')
  })

  ngOnInit(): void {
    this.getCalendar();
  }

  getCalendar(){
    this.isCalendarLoading = true;

    this.calendarApi.getCalendar()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.calendarFormData = res;
          this.calendarForm.controls.calendarName.setValue(res.calendar_name);
          this.isCalendarLoading = false;
        },
        error: (err) => {
          this.connectionToast.openToast();
          this.isCalendarLoading = false;
          console.log(err);
        }
      })
  }

  updateCalendar(){
    let data: Calendar = {
      user: this.customCookie.getCookie('personal_id') as string,
      calendar_name: this.calendarForm.controls.calendarName.value as string
    }

    console.log(data);
    
    this.isCalendarSaving = true;

    this.calendarApi.putCalendar(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isCalendarSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isCalendarSaving = false;
        }
      })
  }

}
