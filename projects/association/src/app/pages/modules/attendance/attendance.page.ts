import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss']
})
export class AttendancePage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Attendance", url: "/home/attendance/all-attendance", icon: "bi bi-list-ul" },
    { text: "New Attendance", url: "/home/attendance/new-attendance", icon: "bi bi-plus-square" },
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/attendance/configuration");
  }

}
