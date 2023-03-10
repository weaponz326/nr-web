import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { GroupFormComponent } from '../group-form/group-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { GroupsApiService } from 'projects/association/src/app/services/modules-api/groups-api/groups-api.service';

import { Group } from 'projects/association/src/app/models/modules/groups/groups.model';


@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private groupsApi: GroupsApiService,
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
    let data: Group = {
      account: this.customCookie.getCookie('association_id') as string,
      group_code: this.groupForm.groupForm.controls.groupCode.value as string,
      group_name: this.groupForm.groupForm.controls.groupName.value as string,
    }

    this.isGroupSaving = true;

    this.groupsApi.postGroup(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isGroupSaving = false;

          sessionStorage.setItem('association_group_id', res.id);
          this.router.navigateByUrl('/home/groups/view-group');
        },
        error: (err) => {
          console.log(err);
          this.isGroupSaving = false;
          this.connectionToast.openToast();
        }
      }) 
  }

  getNewGroupCodeConfig(){
    this.groupsApi.getNewGroupCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.code){
            this.groupForm.groupForm.controls.groupCode.setValue(res.code);
            this.groupForm.groupForm.controls.groupCode.disable();
          }
          else{
            this.groupForm.groupForm.controls.groupCode.enable();
          }
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }


}
