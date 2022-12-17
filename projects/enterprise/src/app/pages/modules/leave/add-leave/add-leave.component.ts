import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { LeaveFormComponent } from '../leave-form/leave-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { LeaveApiService } from 'projects/enterprise/src/app/services/modules-api/leave-api/leave-api.service';

import { Leave } from 'projects/enterprise/src/app/models/modules/leave/leave.model';


@Component({
  selector: 'app-add-leave',
  templateUrl: './add-leave.component.html',
  styleUrls: ['./add-leave.component.scss']
})
export class AddLeaveComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private leaveApi: LeaveApiService
  ) { }

  @ViewChild('leaveFormComponentReference', { read: LeaveFormComponent, static: false }) leaveForm!: LeaveFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Add Leave", url: "/home/leave/add-leave" },
  ];

  isLeaveaving = false;

  ngOnInit(): void {
    this.getNewLeaveCodeConfig();
  }

  postLeave(){
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
    this.isLeaveaving = true;

    this.leaveApi.postLeave(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isLeaveaving = false;

          sessionStorage.setItem('enterprise_leave_id', res.id);
          this.router.navigateByUrl('/home/leave/view-leave');
        },
        error: (err) => {
          console.log(err);
          this.isLeaveaving = false;
          this.connectionToast.openToast();
        }
      })    
  }

  getNewLeaveCodeConfig(){
    
    
  }

}
