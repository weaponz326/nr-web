import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { AttendanceFormComponent } from '../attendance-form/attendance-form.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AttendanceApiService } from 'projects/association/src/app/services/modules-api/attendance-api/attendance-api.service';

import { Attendance } from 'projects/association/src/app/models/modules/attendance/attendance.model';


@Component({
  selector: 'app-new-attendance',
  templateUrl: './new-attendance.component.html',
  styleUrls: ['./new-attendance.component.scss']
})
export class NewAttendanceComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private attendanceApi: AttendanceApiService
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

  postAttendance(){
    let data: Attendance = {
      account: this.customCookie.getCookie('association_id') as string,
      attendance_code: this.attendanceForm.attendanceForm.controls.attendanceCode.value as string,
      attendance_name: this.attendanceForm.attendanceForm.controls.attendanceName.value as string,
      from_date: this.attendanceForm.attendanceForm.controls.fromDate.value,
      to_date: this.attendanceForm.attendanceForm.controls.toDate.value,
      // fiscal_year: this.attendanceForm.selectedYearId,        
    }

    this.isAttendanceSaving = true;

    this.attendanceApi.postAttendance(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          sessionStorage.setItem('association_attendance_id', res.id);
          this.router.navigateByUrl('/home/attendance/view-attendance');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getNewAttendanceCodeConfig(){
    
  }

}
