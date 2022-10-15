import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.page.html',
  styleUrls: ['./timetable.page.scss']
})
export class TimetablePage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Timetables", url: "/home/timetable/all-timetable", icon: "bi bi-list-ul" },
    { text: "New Timetable", url: "/home/timetable/new-timetable", icon: "bi bi-plus-square" },
  ]
  
  ngOnInit(): void {
  }

}
