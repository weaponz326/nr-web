import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.component.html',
  styleUrls: ['./student-report.component.scss']
})
export class StudentReportComponent implements OnInit {

  constructor() { }

  navHeading: any[] = [
    { text: "All Report", url: "/home/report/all-report" },
    { text: "Class Report", url: "/home/report/class-report" },
    { text: "Student Report", url: "/home/report/student-report" },
  ];

  ngOnInit(): void {
  }

}
