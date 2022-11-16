import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { GroupFormComponent } from '../group-form/group-form.component';
import { GroupMembersComponent } from '../group-members/group-members.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.scss']
})
export class ViewGroupComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
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

    
  }

  putGroup(){
    let data = {
      account: this.customCookie.getCookie('association_id') as string,
      group_code: this.groupForm.groupForm.controls.groupCode.value as string,
      group_name: this.groupForm.groupForm.controls.groupName.value as string,
    }

    console.log(data);
    this.isGroupSaving = true;

    
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteGroup(){
    this.isGroupDeleting = true;

    
  }

  onPrint(){
    console.log("lets start printing...");
    // this.groupsPrint.printViewGroup();
  }

}
