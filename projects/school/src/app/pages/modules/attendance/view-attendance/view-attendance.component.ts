import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AttendanceFormComponent } from '../attendance-form/attendance-form.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AttendanceApiService } from 'projects/school/src/app/services/modules-api/attendance-api/attendance-api.service';
// import { AttendancePrintService } from 'projects/school/src/app/services/printing/attendance-print/attendance-print.service';

import { StudentAttendance, TeacherAttendance } from 'projects/school/src/app/models/modules/attendance/attendance.model';


@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.scss']
})
export class ViewAttendanceComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private attendanceApi: AttendanceApiService,
    // private attendancePrint: AttendancePrintService
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
    this.getAttendanceCodeConfig();
  }

  getAttendance(){
    if(sessionStorage.getItem('schoolAttendanceSource') == "Students")
      this.getStudentAttendance();
    else if(sessionStorage.getItem('schoolAttendanceSource') == "Teachers")
      this.getTeacherAttendance();
  }

  putAttendance(){
    if(sessionStorage.getItem('schoolAttendanceSource') == "Students")
      this.putStudentAttendance();
    else if(sessionStorage.getItem('schoolAttendanceSource') == "Teachers")
      this.putTeacherAttendance();
  }

  deleteAttendance(){
    if(sessionStorage.getItem('schoolAttendanceSource') == "Students")
      this.deleteStudentAttendance();
    else if(sessionStorage.getItem('schoolAttendanceSource') == "Teachers")
      this.deleteTeacherAttendance();
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  // students attendance

  getStudentAttendance(){
    this.isAttendanceLoading = true;

    this.attendanceApi.getStudentAttendance()
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.attendanceFormData = res;
          this.isAttendanceLoading = false;

          this.attendanceForm.attendanceForm.controls.attendanceSource.setValue(sessionStorage.getItem('schoolAttendanceSource'));

          this.attendanceForm.attendanceForm.controls.attendanceCode.setValue(this.attendanceFormData.attendance_code);
          this.attendanceForm.attendanceForm.controls.attendanceName.setValue(this.attendanceFormData.attendance_name);
          this.attendanceForm.attendanceForm.controls.fromDate.setValue(this.attendanceFormData.from_date);
          this.attendanceForm.attendanceForm.controls.toDate.setValue(this.attendanceFormData.to_date);

          this.attendanceForm.selectedClassId = this.attendanceFormData.source.id;
          this.attendanceForm.attendanceForm.controls.clase.setValue(this.attendanceFormData.clase.class_name);
          this.attendanceForm.selectedTermId = this.attendanceFormData.term?.id;
          this.attendanceForm.attendanceForm.controls.term.setValue(this.attendanceFormData.term?.term_name);
        },
        error: (err: any) => {
          console.log(err);
          this.isAttendanceLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putStudentAttendance(){
    let data: StudentAttendance = {
      account: this.customCookie.getCookie('school_id') as string,
      attendance_code: this.attendanceForm.attendanceForm.controls.attendanceCode.value as string,
      attendance_name: this.attendanceForm.attendanceForm.controls.attendanceName.value as string,
      from_date: this.attendanceForm.attendanceForm.controls.fromDate.value as string,
      to_date: this.attendanceForm.attendanceForm.controls.toDate.value as string,
      term: this.attendanceForm.selectedTermId,        
      clase: this.attendanceForm.selectedClassId,        
    }

    console.log(data);
    this.isAttendanceSaving = true;

    this.attendanceApi.putStudentAttendance(data)
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

  deleteStudentAttendance(){
    this.isAttendanceDeleting = true;

    this.attendanceApi.deleteStudentAttendance()
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

  // teachers attendance

  getTeacherAttendance(){
    this.isAttendanceLoading = true;

    this.attendanceApi.getTeacherAttendance()
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.attendanceFormData = res;
          this.isAttendanceLoading = false;

          this.attendanceForm.attendanceForm.controls.attendanceSource.setValue(sessionStorage.getItem('schoolAttendanceSource'));

          this.attendanceForm.attendanceForm.controls.attendanceCode.setValue(this.attendanceFormData.attendance_code);
          this.attendanceForm.attendanceForm.controls.attendanceName.setValue(this.attendanceFormData.attendance_name);
          this.attendanceForm.attendanceForm.controls.fromDate.setValue(this.attendanceFormData.from_date);
          this.attendanceForm.attendanceForm.controls.toDate.setValue(this.attendanceFormData.to_date);

          this.attendanceForm.selectedTermId = this.attendanceFormData.term?.id;
          this.attendanceForm.attendanceForm.controls.term.setValue(this.attendanceFormData.term?.term_name);
        },
        error: (err: any) => {
          console.log(err);
          this.isAttendanceLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putTeacherAttendance(){
    let data: TeacherAttendance = {
      account: this.customCookie.getCookie('school_id') as string,
      attendance_code: this.attendanceForm.attendanceForm.controls.attendanceCode.value as string,
      attendance_name: this.attendanceForm.attendanceForm.controls.attendanceName.value as string,
      from_date: this.attendanceForm.attendanceForm.controls.fromDate.value as string,
      to_date: this.attendanceForm.attendanceForm.controls.toDate.value as string,
      term: this.attendanceForm.selectedTermId,        
    }

    console.log(data);
    this.isAttendanceSaving = true;

    this.attendanceApi.putTeacherAttendance(data)
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

  deleteTeacherAttendance(){
    this.isAttendanceDeleting = true;

    this.attendanceApi.deleteTeacherAttendance()
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

  getAttendanceCodeConfig(){
    this.attendanceApi.getAttendanceCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          
          if (res.entry_mode == "Auto")
            this.attendanceForm.attendanceForm.controls.attendanceCode.disable();
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
