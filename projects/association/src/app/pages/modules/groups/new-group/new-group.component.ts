import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { GroupFormComponent } from '../group-form/group-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
  ) { }

  @ViewChild('groupFormComponentReference', { read: GroupFormComponent, static: false }) groupForm!: GroupFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Group", url: "/home/groups/new-group" },
  ];

  isGroupSaving = false;

  ngOnInit(): void {
    this.getNewGroupCodeConfig();
  }

  postGroup(){
    let data = {
      account: this.customCookie.getCookie('association_id') as string,
      group_code: this.groupForm.groupForm.controls.groupCode.value as string,
      group_name: this.groupForm.groupForm.controls.groupName.value as string,
    }

    this.isGroupSaving = true;

    
  }

  getNewGroupCodeConfig(){
    
    
  }

}
