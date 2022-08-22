import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss']
})
export class CalendarPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Calendars", url: "/home/calendar/all-calendar", icon: "bi bi-list-ul" },
    { text: "All Schedules", url: "/home/calendar/all-schedules", icon: "bi bi-list-ul" }
  ]

  ngOnInit(): void {
  }

}
