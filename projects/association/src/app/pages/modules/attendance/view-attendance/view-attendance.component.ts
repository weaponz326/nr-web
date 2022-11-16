import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AttendanceFormComponent } from '../attendance-form/attendance-form.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.scss']
})
export class ViewAttendanceComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
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

    
  }

  putAttendance(){
    let data = {
      account: this.customCookie.getCookie('asociation_id') as string,
      attendance_code: this.attendanceForm.attendanceForm.controls.attendanceCode.value as string,
      attendance_name: this.attendanceForm.attendanceForm.controls.attendanceName.value as string,
      from_date: this.attendanceForm.attendanceForm.controls.fromDate.value as string,
      to_date: this.attendanceForm.attendanceForm.controls.toDate.value as string,
      fiscal_year: this.attendanceForm.selectedYearId,        
    }

    console.log(data);
    this.isAttendanceSaving = true;

    
  }

  deleteAttendance(){
    this.isAttendanceDeleting = true;

    
  }

  // printing

  onPrint(){
    console.log("lets start printing...");
    // this.attendancePrint.printViewAttendance();
  }

}
