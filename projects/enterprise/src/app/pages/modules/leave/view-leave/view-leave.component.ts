import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { LeaveFormComponent } from '../leave-form/leave-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { LeaveApiService } from 'projects/enterprise/src/app/services/modules-api/leave-api/leave-api.service';

import { Leave } from 'projects/enterprise/src/app/models/modules/leave/leave.model';


@Component({
  selector: 'app-view-leave',
  templateUrl: './view-leave.component.html',
  styleUrls: ['./view-leave.component.scss']
})
export class ViewLeaveComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private leaveApi: LeaveApiService
  ) { }

  @ViewChild('leaveFormComponentReference', { read: LeaveFormComponent, static: false }) leaveForm!: LeaveFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Leave", url: "/home/leave/all-leave" },
    { text: "View Leave", url: "/home/leave/view-leave" },
  ];

  leaveData: any;

  isLeaveLoading = false;
  isLeaveSaving = false;
  isLeaveDeleting = false;

  isActiveLeaveaving = false;

  ngOnInit(): void {
    this.getLeave();
    this.getLeaveCodeConfig();
  }

  getLeave(){
    this.isLeaveLoading = true;

    this.leaveApi.getLeave()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.leaveData = res;
          this.isLeaveLoading = false;

          this.leaveForm.leaveForm.controls.leaveCode.setValue(this.leaveData.leave_code);
          this.leaveForm.leaveForm.controls.employeeCode.setValue(this.leaveData.employee?.employee_code);
          this.leaveForm.leaveForm.controls.employeeName.setValue(this.leaveData.employee?.first_name + " " + this.leaveData.employee?.last_name);
          this.leaveForm.leaveForm.controls.leaveType.setValue(this.leaveData.leave_type);
          this.leaveForm.leaveForm.controls.leaveStart.setValue(this.leaveData.leave_start);
          this.leaveForm.leaveForm.controls.leaveEnd.setValue(this.leaveData.leave_end);
          this.leaveForm.leaveForm.controls.leaveStatus.setValue(this.leaveData.leave_status);

          this.leaveForm.selectedEmployeeId = this.leaveData.employee.id;
        },
        error: (err) => {
          console.log(err);
          this.isLeaveLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  updateLeave(){
    console.log('u are saving a new leave');

    var data: Leave = {
      account: this.customCookie.getCookie('enterprise_id') as string,
      employee: this.leaveForm.selectedEmployeeId,
      leave_code: this.leaveForm.leaveForm.controls.leaveCode.value as string,
      leave_type: this.leaveForm.leaveForm.controls.leaveType.value as string,
      leave_start: this.leaveForm.leaveForm.controls.leaveStart.value,
      leave_end: this.leaveForm.leaveForm.controls.leaveEnd.value,
      leave_status: this.leaveForm.leaveForm.controls.leaveStatus.value as string,
    }

    console.log(data);
    this.isLeaveSaving = true;

    this.leaveApi.putLeave(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isLeaveSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isLeaveSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteLeave(){
    this.isLeaveDeleting = true;

    this.leaveApi.deleteLeave()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/leave/all-leave');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      }) 
  }

  getLeaveCodeConfig(){
    this.leaveApi.getLeaveCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.entry_mode == "Auto")
            this.leaveForm.leaveForm.controls.leaveCode.disable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }
  
  onPrint(){
    console.log("lets start printing...");
    // this.leavePrint.printViewLeave();
  }

}
