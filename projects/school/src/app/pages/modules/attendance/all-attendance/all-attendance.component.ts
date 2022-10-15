import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { NewAttendanceComponent } from '../new-attendance/new-attendance.component'
// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';

// import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';
// import { AttendanceApiService } from 'projects/school/src/app/services/modules/attendance-api/attendance-api.service';
// import { AttendancePrintService } from 'projects/school/src/app/services/printing/attendance-print/attendance-print.service';


@Component({
  selector: 'app-all-attendance',
  templateUrl: './all-attendance.component.html',
  styleUrls: ['./all-attendance.component.scss']
})
export class AllAttendanceComponent implements OnInit {

  constructor(
    private router: Router,
    // private activeTerm: ActiveTermService,
    // private attendanceApi: AttendanceApiService,
    // private attendancePrint: AttendancePrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('newAttendanceComponentReference', { read: NewAttendanceComponent, static: false }) newAttendance!: NewAttendanceComponent;
  // @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;

  navHeading: any[] = [
    { text: "All Attendance", url: "/home/attendance/all-attendance" },
  ];

  activeTermName: any;

  attendanceGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getActiveTerm();
    this.getAccountAttendance();
  }

  getActiveTerm(){
    // this.activeTermName = this.activeTerm.getActiveTerm().data.term_name;
  }

  getAccountAttendance(){
    this.isFetchingGridData = true;

    // this.attendanceApi.getAccountAttendance(this.sortParams, 20)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.attendanceGridData = res.docs;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isFetchingGridData = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  sortTable(column: any){
    console.log(column);
    this.getAccountAttendance();

    this.currentSortColumn = column;
  }

  viewAttendance(attendanceId: any){
    console.log(attendanceId);

    sessionStorage.setItem('school_attendance_id', attendanceId);
    this.router.navigateByUrl('/home/attendance/view-attendance');
  }

  openTermWindow(){
    console.log("You are opening select term window")
    // this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    // this.activeTerm.setActiveTerm(termData);
    this.getActiveTerm();
    this.getAccountAttendance();
  }

  onPrint(){
    console.log("lets start printing...");
    // this.attendancePrint.printAllAttendance();
  }

}
