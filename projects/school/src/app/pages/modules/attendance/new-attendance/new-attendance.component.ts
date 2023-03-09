import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { AttendanceFormComponent } from '../attendance-form/attendance-form.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AttendanceApiService } from 'projects/school/src/app/services/modules-api/attendance-api/attendance-api.service';

import { StudentAttendance, TeacherAttendance } from 'projects/school/src/app/models/modules/attendance/attendance.model';


@Component({
  selector: 'app-new-attendance',
  templateUrl: './new-attendance.component.html',
  styleUrls: ['./new-attendance.component.scss']
})
export class NewAttendanceComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private attendanceApi: AttendanceApiService,
  ) { }

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;

  @ViewChild('attendanceFormComponentReference', { read: AttendanceFormComponent, static: false }) attendanceForm!: AttendanceFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Attendance", url: "/home/attendance/new-attendance" },
  ];

  isAttendanceSaving = false;

  ngOnInit(): void {
    this.getNewAttendanceCodeConfig();
  }

  ngAfterViewInit(): void {
    let activeTerm = JSON.parse(String(localStorage.getItem('schoolActiveTerm')));
    
    this.attendanceForm.selectedTermId = activeTerm.term.id
    this.attendanceForm.attendanceForm.controls.term.setValue(activeTerm.term.term_name);
  }

  createAttendance(){
    if(this.attendanceForm.attendanceForm.controls.attendanceSource.value == "Students")
      this.postStudentAttendance()
    else if(this.attendanceForm.attendanceForm.controls.attendanceSource.value == "Teachers")
      this.postTeacherAttendance()
  }

  postStudentAttendance(){
    let data: StudentAttendance = {
      account: this.customCookie.getCookie('school_id') as string,
      attendance_code: this.attendanceForm.attendanceForm.controls.attendanceCode.value as string,
      attendance_name: this.attendanceForm.attendanceForm.controls.attendanceName.value as string,
      from_date: this.attendanceForm.attendanceForm.controls.fromDate.value as string,
      to_date: this.attendanceForm.attendanceForm.controls.toDate.value as string,
      term: this.attendanceForm.selectedTermId,        
      clase: this.attendanceForm.selectedClassId,        
    }

    this.isAttendanceSaving = true;

    this.attendanceApi.postStudentAttendance(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          sessionStorage.setItem('school_student_attendance_id', res.id);
          sessionStorage.setItem('schoolAttendanceSource', "Students");
          this.router.navigateByUrl('/home/attendance/view-attendance');
        },
        error: (err) => {
          console.log(err);
          this.isAttendanceSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  postTeacherAttendance(){
    let data: TeacherAttendance = {
      account: this.customCookie.getCookie('school_id') as string,
      attendance_code: this.attendanceForm.attendanceForm.controls.attendanceCode.value as string,
      attendance_name: this.attendanceForm.attendanceForm.controls.attendanceName.value as string,
      from_date: this.attendanceForm.attendanceForm.controls.fromDate.value as string,
      to_date: this.attendanceForm.attendanceForm.controls.toDate.value as string,
      term: this.attendanceForm.selectedTermId,        
    }

    this.isAttendanceSaving = true;

    this.attendanceApi.postTeacherAttendance(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          sessionStorage.setItem('school_teacher_attendance_id', res.id);
          sessionStorage.setItem('schoolAttendanceSource', "Teachers");
          this.router.navigateByUrl('/home/attendance/view-attendance');
        },
        error: (err) => {
          console.log(err);
          this.isAttendanceSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  getNewAttendanceCodeConfig(){
    this.attendanceApi.getNewAttendanceCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.code){
            this.attendanceForm.attendanceForm.controls.attendanceCode.disable();
            this.attendanceForm.attendanceForm.controls.attendanceCode.setValue(res.code);
          }
          else{
            this.attendanceForm.attendanceForm.controls.attendanceCode.enable();
          }
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
