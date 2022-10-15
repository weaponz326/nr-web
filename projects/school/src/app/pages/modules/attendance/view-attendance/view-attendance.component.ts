import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AttendanceFormComponent } from '../attendance-form/attendance-form.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
// import { DeleteModalComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal/delete-modal.component'

// import { AttendanceApiService } from 'projects/school/src/app/services/modules/attendance-api/attendance-api.service';
// import { AttendancePrintService } from 'projects/school/src/app/services/printing/attendance-print/attendance-print.service';

// import { Attendance } from 'projects/school/src/app/models/modules/attendance/attendance.model';


@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.scss']
})
export class ViewAttendanceComponent implements OnInit {

  constructor(
    private router: Router,
    // private attendanceApi: AttendanceApiService,
    // private attendancePrint: AttendancePrintService
  ) { }

  @ViewChild('attendanceFormComponentReference', { read: AttendanceFormComponent, static: false }) attendanceForm!: AttendanceFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('deleteModalComponentReference', { read: DeleteModalComponent, static: false }) deleteModal!: DeleteModalComponent;

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

  getAttendance(){
    this.isAttendanceLoading = true;

    // this.attendanceApi.getAttendance()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.attendanceFormData = res;
    //       this.isAttendanceLoading = false;

    //       this.attendanceForm.attendanceForm.controls.attendanceCode.setValue(this.attendanceFormData.data().attendance_code);
    //       this.attendanceForm.attendanceForm.controls.attendanceName.setValue(this.attendanceFormData.data().attendance_name);
    //       this.attendanceForm.attendanceForm.controls.fromDate.setValue(this.attendanceFormData.data().from_date);
    //       this.attendanceForm.attendanceForm.controls.toDate.setValue(this.attendanceFormData.data().to_date);

    //       this.attendanceForm.selectedClassId = this.attendanceFormData.data().source.id;
    //       this.attendanceForm.selectedClassData = this.attendanceFormData.data().source.data;
    //       this.attendanceForm.attendanceForm.controls.source.setValue(this.attendanceFormData.data().source.data.class_name);
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isAttendanceLoading = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  updateAttendance(){
    let data = {
      attendance_code: this.attendanceForm.attendanceForm.controls.attendanceCode.value,
      attendance_name: this.attendanceForm.attendanceForm.controls.attendanceName.value,
      from_date: this.attendanceForm.attendanceForm.controls.fromDate.value,
      to_date: this.attendanceForm.attendanceForm.controls.toDate.value,
      term: this.attendanceForm.selectedTermId,       
      source: this.attendanceForm.selectedClassId,
    }

    console.log(data);
    this.isAttendanceSaving = true;

    // this.attendanceApi.updateAttendance(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.isAttendanceSaving = false;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isAttendanceSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  confirmDelete(){
    // this.deleteModal.openModal();
  }

  deleteAttendance(){
    this.isAttendanceDeleting = true;

    // this.attendanceApi.deleteAttendance()
    //   .then(
    //     (res: any) => {
    //       console.log(res);

    //       this.router.navigateByUrl('/home/attendance/all-attendance');
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  onPrint(){
    console.log("lets start printing...");
    // this.attendancePrint.printViewAttendance();
  }

}
