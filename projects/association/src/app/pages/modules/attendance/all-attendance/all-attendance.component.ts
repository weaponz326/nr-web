import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { NewAttendanceComponent } from '../new-attendance/new-attendance.component'

import { AttendanceApiService } from 'projects/association/src/app/services/modules-api/attendance-api/attendance-api.service';


@Component({
  selector: 'app-all-attendance',
  templateUrl: './all-attendance.component.html',
  styleUrls: ['./all-attendance.component.scss']
})
export class AllAttendanceComponent implements OnInit {

  constructor(
    private router: Router,
    private attendanceApi: AttendanceApiService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('newAttendanceComponentReference', { read: NewAttendanceComponent, static: false }) newAttendance!: NewAttendanceComponent;

  navHeading: any[] = [
    { text: "All Attendance", url: "/home/attendance/all-attendance" },
  ];

  attendanceGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountAttendance(1, 20, "-created_at");
  }

  getAccountAttendance(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.attendanceApi.getAccountAttendance(page, size, sortField)
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
    this.getAccountAttendance(1, 20, column);

    this.currentSortColumn = column;
  }

  viewAttendance(attendanceId: any){
    console.log(attendanceId);

    sessionStorage.setItem('association_attendance_id', attendanceId);
    this.router.navigateByUrl('/home/attendance/view-attendance');
  }

  onPrint(){
    console.log("lets start printing...");
    // this.attendancePrint.printAllAttendance();
  }

}
