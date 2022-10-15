import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { AttendanceFormComponent } from '../attendance-form/attendance-form.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { AttendanceApiService } from 'projects/school/src/app/services/modules/attendance-api/attendance-api.service';
// import { ClassesApiService } from 'projects/school/src/app/services/modules/classes-api/classes-api.service';

// import { Attendance } from 'projects/school/src/app/models/modules/attendance/attendance.model';


@Component({
  selector: 'app-new-attendance',
  templateUrl: './new-attendance.component.html',
  styleUrls: ['./new-attendance.component.scss']
})
export class NewAttendanceComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    // private attendanceApi: AttendanceApiService,
    // private classesApi: ClassesApiService,
  ) { }

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;

  @ViewChild('attendanceFormComponentReference', { read: AttendanceFormComponent, static: false }) attendanceForm!: AttendanceFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Attendance", url: "/home/attendance/new-attendance" },
  ];

  isAttendanceSaving = false;

  ngOnInit(): void {
  }

  createAttendance(){
    // let data: Attendance = {
    //   account: this.customCookie.getCookie('restaurant_id') as string,
    //   attendance_code: this.attendanceForm.attendanceForm.controls.attendanceCode.value,
    //   attendance_name: this.attendanceForm.attendanceForm.controls.attendanceName.value,
    //   from_date: this.attendanceForm.attendanceForm.controls.fromDate.value,
    //   to_date: this.attendanceForm.attendanceForm.controls.toDate.value,
    //   term: this.attendanceForm.selectedTermId,        
    //   source: this.attendanceForm.selectedClassId,        
    // }

    this.isAttendanceSaving = true;

    // this.attendanceApi.createAttendance(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       sessionStorage.setItem('school_attendance_id', res.id);
    //       sessionStorage.setItem('school_class_id', this.attendanceForm.selectedClassId);
    //       this.getClassClassStudent();
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isAttendanceSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  getClassClassStudent(){
    // this.classesApi.getClassClassStudent()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.setAttendanceSheet(res.docs);
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  // // TODO: do something about it
  // setAttendanceSheet(classStudents: any){
  //   let classSheet: any = [];

  //   let sheetDateChecks: {[key: string]: any} = {};
  //   var fromDate = moment(this.attendanceForm.attendanceForm.controls.fromDate.value);
  //   var toDate = moment(this.attendanceForm.attendanceForm.controls.toDate.value);

  //   while(fromDate <= toDate) {
  //     fromDate.add(1, 'days');
  //     sheetDateChecks[fromDate.toDate().toISOString().slice(0, 10)] = "";
  //   }
  //   console.log(sheetDateChecks);

  //   classStudents.forEach((data: any) => {
  //     let sheetRow = {
  //       student: {
  //         id: data.data().student.id,
  //         data: {
  //           student_code: data.data().student.data.student_code,
  //           first_name: data.data().student.data.first_name,
  //           last_name: data.data().student.data.last_name,
  //         }
  //       },
  //       checks: sheetDateChecks
  //     };

  //     classSheet.push(sheetRow);
  //   });

  //   console.log(classSheet);
  //   this.createAttendanceSheet(classSheet);
  // }

  createAttendanceSheet(classSheet: any){
    let data = { sheet: classSheet };

    // this.attendanceApi.createAttendanceSheet(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.router.navigateByUrl('/home/attendance/view-attendance');
    //       this.isAttendanceSaving = false;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isAttendanceSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

}
