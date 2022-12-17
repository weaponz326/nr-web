import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AttendanceFormComponent } from '../attendance-form/attendance-form.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AttendanceApiService } from 'projects/enterprise/src/app/services/modules-api/attendance-api/attendance-api.service';

import { Attendance } from 'projects/enterprise/src/app/models/modules/attendance/attendance.model';


@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.scss']
})
export class ViewAttendanceComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private attendanceApi: AttendanceApiService
  ) { }

  @ViewChild('attendanceFormComponentReference', { read: AttendanceFormComponent, static: false }) attendanceForm!: AttendanceFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Attendance", url: "/home/attendance/all-attendance" },
    { text: "View Attendance", url: "/home/attendance/view-attendance" },
  ];

  attendanceFormData: any;

  isAttendanceLoading = false;
  isAttendanceSaving = false;
  isAttendanceDeleting = false;

  ngOnInit(): void {
    this.getAttendance();
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  // students attendance

  getAttendance(){
    this.isAttendanceLoading = true;

    this.attendanceApi.getAttendance()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.attendanceFormData = res;
          this.isAttendanceLoading = false;

          this.attendanceForm.attendanceForm.controls.attendanceCode.setValue(this.attendanceFormData.attendance_code);
          this.attendanceForm.attendanceForm.controls.attendanceName.setValue(this.attendanceFormData.attendance_name);
          this.attendanceForm.attendanceForm.controls.fromDate.setValue(this.attendanceFormData.from_date);
          this.attendanceForm.attendanceForm.controls.toDate.setValue(this.attendanceFormData.to_date);
          this.attendanceForm.attendanceForm.controls.fiscalYear.setValue(this.attendanceFormData.fiscal_year);

        },
        error: (err) => {
          console.log(err);
          this.isAttendanceLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putAttendance(){
    let data: Attendance = {
      account: this.customCookie.getCookie('enterprise_id') as string,
      attendance_code: this.attendanceForm.attendanceForm.controls.attendanceCode.value as string,
      attendance_name: this.attendanceForm.attendanceForm.controls.attendanceName.value as string,
      from_date: this.attendanceForm.attendanceForm.controls.fromDate.value,
      to_date: this.attendanceForm.attendanceForm.controls.toDate.value,
    }

    console.log(data);
    this.isAttendanceSaving = true;

    this.attendanceApi.putAttendance(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isAttendanceSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isAttendanceSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  deleteAttendance(){
    this.isAttendanceDeleting = true;

    this.attendanceApi.deleteAttendance()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/attendance/all-attendance');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })  
  }

  // printing

  onPrint(){
    console.log("lets start printing...");
    // this.attendancePrint.printViewAttendance();
  }

}
