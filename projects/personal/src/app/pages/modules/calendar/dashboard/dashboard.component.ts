import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  navHeading: any[] = [
    { text: "All Calendars", url: "/home/calendar/all-calendar" },
  ];

  ngOnInit(): void {
  }

  onPrint(){
    console.log("lets start printing...");
    // this.calendarPrint.printAllCalendars();
  }

}
