import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { AttendanceApiService } from 'projects/school/src/app/services/modules-api/attendance-api/attendance-api.service';


@Component({
  selector: 'app-students-attendance',
  templateUrl: './students-attendance.component.html',
  styleUrls: ['./students-attendance.component.scss']
})
export class StudentsAttendanceComponent implements OnInit {

  constructor(
    private router: Router,
    private attendanceApi: AttendanceApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  attendanceGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountStudentAttendance(1, 20, "-created_at");
  }

  getAccountStudentAttendance(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.attendanceApi.getAccountStudentAttendance(page, size, sortField)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.attendanceGridData = res.results;

        this.currentPage = res.current_page;
        this.totalPages = res.total_pages;
        this.totalItems = res.count;

        this.isFetchingGridData = false;
        if(this.totalItems == 0)
          this.isDataAvailable = false
      },
      error: (err) => {
        console.log(err);
        this.isFetchingGridData = false;
        this.connectionToast.openToast();
      }
    })
  }

  sortTable(column: any){
    console.log(column);
    this.getAccountStudentAttendance(1, 20, "-created_at");

    this.currentSortColumn = column;
  }

  viewAttendance(attendanceId: any){
    console.log(attendanceId);

    sessionStorage.setItem('school_attendance_id', attendanceId);
    sessionStorage.setItem('schoolAttendanceSource', "Students");
    this.router.navigateByUrl('/home/attendance/view-attendance');
  }

}
