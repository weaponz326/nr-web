import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { CalendarApiService } from 'projects/personal/src/app/services/modules-api/calendar-api/calendar-api.service';

import { Calendar } from 'projects/personal/src/app/models/modules/calendar/calendar.model';


@Component({
  selector: 'app-new-calendar',
  templateUrl: './new-calendar.component.html',
  styleUrls: ['./new-calendar.component.scss']
})
export class NewCalendarComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private calendarApi: CalendarApiService
  ) { }

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isSavingCalendar = false;

  calendarForm = new FormGroup({
    calendarName: new FormControl('')
  })

  ngOnInit(): void {
  }

  openModal(){
    this.newButton.nativeElement.click();
  }

  createCalendar(){
    let data: Calendar = {
      user: this.customCookie.getCookie('personal_id') as string,
      calendar_name: this.calendarForm.controls.calendarName.value as string
    }

    console.log(data);

    this.isSavingCalendar = true;

    this.calendarApi.postCalendar(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            sessionStorage.setItem('personal_calendar_id', res.id);
            this.router.navigateByUrl('/home/calendar/view-calendar');
            this.dismissButton.nativeElement.click();
          }

          this.isSavingCalendar = false;
        },
        error: (err) => {
          this.connectionToast.openToast();
          this.isSavingCalendar = false;
          console.log(err);
        }
      })
  }

}
