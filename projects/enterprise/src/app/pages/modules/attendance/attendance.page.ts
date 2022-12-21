import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss']
})
export class AttendancePage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Attendance", url: "/home/attendance/all-attendance", icon: "bi bi-list-ul" },
    { text: "New Attendance", url: "/home/attendance/new-attendance", icon: "bi bi-plus-square" },
  ]
  
  ngOnInit(): void {
  }

}
