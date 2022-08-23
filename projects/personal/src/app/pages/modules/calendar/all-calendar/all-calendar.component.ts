import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NewCalendarComponent } from '../new-calendar/new-calendar.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { CalendarApiService } from 'projects/personal/src/app/services/modules-api/calendar-api/calendar-api.service';
import { CalendarPrintService } from 'projects/personal/src/app/services/printing/calendar-print/calendar-print.service';


@Component({
  selector: 'app-all-calendar',
  templateUrl: './all-calendar.component.html',
  styleUrls: ['./all-calendar.component.scss']
})
export class AllCalendarComponent implements OnInit {

  constructor(
    private router: Router,
    private calendarApi: CalendarApiService,
    private calendarPrint: CalendarPrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('newCalendarComponentReference', { read: NewCalendarComponent, static: false }) newCalendar!: NewCalendarComponent;
  
  navHeading: any[] = [
    { text: "All Calendars", url: "/home/calendar/all-calendar" },
  ];

  calendarGridData: any[] = [];

  isFetchingGridData: boolean =  true;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getUserCalendars(1, 20, "");
  }

  getUserCalendars(page: any, size: any, sortField: any){
    this.isFetchingGridData =  true;

    this.calendarApi.getUserCalendars(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.calendarGridData = res.results;
          this.currentPage = res.current_page;
          this.totalPages = res.total_pages;
          this.totalItems = res.count;

          this.isFetchingGridData = false;
          if(this.totalItems == 0)
            this.isDataAvailable = false
        },
        error: (err) => {
          this.connectionToast.openToast();
          this.isFetchingGridData = false;
          console.log(err);
        }
      })
  }

  sortTable(column: any){
    console.log(column);
    this.getUserCalendars(1, 20, column);

    this.currentSortColumn = column;
  }

  viewCalendar(id: any){
    console.log(id);

    sessionStorage.setItem('personal_calendar_id', id);
    this.router.navigateByUrl('/home/calendar/view-calendar')
  }

  onPrint(){
    console.log("lets start printing...");
    // this.calendarPrint.printAllCalendars();
  }

}
