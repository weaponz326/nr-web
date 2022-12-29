import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { GroupFormComponent } from '../group-form/group-form.component';
import { GroupMembersComponent } from '../group-members/group-members.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { GroupsApiService } from 'projects/association/src/app/services/modules-api/groups-api/groups-api.service';
// import { GroupsPrintService } from 'projects/association/src/app/services/modules-printing/groups-print/groups-print.service';

import { Group } from 'projects/association/src/app/models/modules/groups/groups.model';


@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.scss']
})
export class ViewGroupComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private groupsApi: GroupsApiService,
    // private groupsPrint: GroupsPrintService,
  ) { }

  @ViewChild('groupFormComponentReference', { read: GroupFormComponent, static: false }) groupForm!: GroupFormComponent;
  @ViewChild('groupMembersComponentReference', { read: GroupMembersComponent, static: false }) groupMembers!: GroupMembersComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Groups", url: "/home/groups/all-groups" },
    { text: "View Group", url: "/home/groups/view-group" },
  ];

  groupData: any;

  isGroupLoading = false;
  isGroupSaving = false;
  isGroupDeleting = false;

  ngOnInit(): void {
    this.getGroup();
  }

  getGroup(){
    this.isGroupLoading = true;

    this.groupsApi.getGroup()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.groupData = res;
          this.isGroupLoading = false;

          this.groupForm.groupForm.controls.groupCode.setValue(this.groupData.group_code);
          this.groupForm.groupForm.controls.groupName.setValue(this.groupData.group_name);
        },
        error: (err) => {
          console.log(err);
          this.isGroupLoading = false;
          this.connectionToast.openToast();
        }
      }) 
  }

  putGroup(){
    let data: Group = {
      account: this.customCookie.getCookie('association_id') as string,
      group_code: this.groupForm.groupForm.controls.groupCode.value as string,
      group_name: this.groupForm.groupForm.controls.groupName.value as string,
    }

    console.log(data);
    this.isGroupSaving = true;

    this.groupsApi.putGroup(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isGroupSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isGroupSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteGroup(){
    this.isGroupDeleting = true;

    this.groupsApi.deleteGroup()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/groups/all-groups');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      }) 
  }

  onPrint(){
    console.log("lets start printing...");
    // this.groupsPrint.printViewGroup();
  }

}
