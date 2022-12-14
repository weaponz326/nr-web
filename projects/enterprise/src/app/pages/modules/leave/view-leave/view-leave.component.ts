import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { LeaveFormComponent } from '../leave-form/leave-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Component({
  selector: 'app-view-leave',
  templateUrl: './view-leave.component.html',
  styleUrls: ['./view-leave.component.scss']
})
export class ViewLeaveComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
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
  isLeaveaving = false;
  isLeaveDeleting = false;

  isActiveLeaveaving = false;

  ngOnInit(): void {
    this.getLeave();
  }

  getLeave(){
    this.isLeaveLoading = true;

    
  }

  updateLeave(){
    console.log('u are saving a new leave');

    var data = {
      account: this.customCookie.getCookie('enterprise_id') as string,
      leave_code: this.leaveForm.leaveForm.controls.leaveCode.value as string,
      leave_type: this.leaveForm.leaveForm.controls.leaveType.value as string,
      leave_start: this.leaveForm.leaveForm.controls.leaveStart.value,
      leave_end: this.leaveForm.leaveForm.controls.leaveEnd.value,
      leave_status: this.leaveForm.leaveForm.controls.leaveStatus.value as string,
    }

    console.log(data);
    this.isLeaveaving = true;

    
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteLeave(){
    this.isLeaveDeleting = true;

    
  }

  putActiveLeave(){
    this.isActiveLeaveaving = true;

    let data = {
      account: this.customCookie.getCookie('enterprise_id') as string,
      leave: sessionStorage.getItem('enterprise_leave_id') as string,
    };

    console.log(data);

    
  }

  onPrint(){
    console.log("lets start printing...");
    // this.leavePrint.printViewLeave();
  }

}
