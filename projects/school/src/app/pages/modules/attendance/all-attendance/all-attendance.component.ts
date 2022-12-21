import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { StudentsAttendanceComponent } from '../students-attendance/students-attendance.component'
import { TeachersAttendanceComponent } from '../teachers-attendance/teachers-attendance.component'
import { NewAttendanceComponent } from '../new-attendance/new-attendance.component'
// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';

// import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';
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
    // private attendancePrint: AttendancePrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('studentsAttendanceComponentReference', { read: StudentsAttendanceComponent, static: false }) studentsAttendance!: StudentsAttendanceComponent;
  @ViewChild('teachersAttendanceComponentReference', { read: TeachersAttendanceComponent, static: false }) teachersAttendance!: TeachersAttendanceComponent;
  @ViewChild('newAttendanceComponentReference', { read: NewAttendanceComponent, static: false }) newAttendance!: NewAttendanceComponent;
  // @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;

  navHeading: any[] = [
    { text: "All Attendance", url: "/home/attendance/all-attendance" },
  ];

  activeTermName: any;

  visibleAttendance = "Students";

  ngOnInit(): void {
    this.getActiveTerm();
  }

  getAccountAttendance(){
    if(this.visibleAttendance == "Students")
      this.studentsAttendance.getAccountStudentAttendance(1, 20, "-created_at")
    else if(this.visibleAttendance == "Teachers")
      this.teachersAttendance.getAccountTeacherAttendance(1, 20, "-created_at")
  }

  getActiveTerm(){
    // this.activeTermName = this.activeTerm.getActiveTerm().data.term_name;
  }

  openTermWindow(){
    console.log("You are opening select term window")
    // this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    // this.activeTerm.setActiveTerm(termData);
    this.getActiveTerm();
  }

  onPrint(){
    console.log("lets start printing...");
    // this.attendancePrint.printAllAttendance();
  }

}
