import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AdminApiService } from 'projects/association/src/app/services/modules-api/admin-api/admin-api.service';

import { UserAccess } from 'projects/association/src/app/models/modules/admin/admin.model';


@Component({
  selector: 'app-access-form',
  templateUrl: './access-form.component.html',
  styleUrls: ['./access-form.component.scss']
})
export class AccessFormComponent implements OnInit {

  constructor(
    private customCookie: CustomCookieService,
    private adminApi: AdminApiService,
  ) { }

  @Input() isCreator = false;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  accessForm: UserAccess = {
    account: this.customCookie.getCookie('association_id') as string,
    accounts_access: false,
    action_plan_access: false,
    admin_access: false,
    attendance_access: false,
    committees_access: false,
    dues_access: false,
    executives_access: false,
    fiscal_year_access: false,
    groups_access: false,
    meetings_access: false,
    members_access: false,
    portal_access: false,
    settings_access: false,
  }

  ngOnInit(): void {
    this.getUserAccess();
  }

  getUserAccess(){
    this.adminApi.getUserAccess()
    .subscribe({
        next: (res) => {
          console.log(res);

          this.accessForm.accounts_access = res.accounts_access;
          this.accessForm.action_plan_access = res.action_plan_access;
          this.accessForm.admin_access = res.admin_access;
          this.accessForm.attendance_access = res.attendance_access;
          this.accessForm.committees_access = res.committees_access;
          this.accessForm.dues_access = res.dues_access;
          this.accessForm.executives_access = res.executives_access;
          this.accessForm.fiscal_year_access = res.fiscal_year_access;
          this.accessForm.groups_access = res.groups_access;
          this.accessForm.meetings_access = res.meetings_access;
          this.accessForm.members_access = res.members_access;
          this.accessForm.portal_access = res.portal_access;
          this.accessForm.settings_access = res.settings_access;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  updateUserAccess(){
    // let access: UserAccess = {
    let access = {
      account: this.customCookie.getCookie('association_id') as string,      
      accounts_access: this.accessForm.accounts_access,
      action_plan_access: this.accessForm.action_plan_access,
      admin_access: this.accessForm.admin_access,
      attendance_access: this.accessForm.attendance_access,
      committees_access: this.accessForm.committees_access,
      dues_access: this.accessForm.dues_access,
      executives_access: this.accessForm.executives_access,
      fiscal_year_access: this.accessForm.fiscal_year_access,
      groups_access: this.accessForm.groups_access,
      meetings_access: this.accessForm.meetings_access,
      members_access: this.accessForm.members_access,
      portal_access: this.accessForm.portal_access,
      settings_access: this.accessForm.settings_access,
    }

    this.adminApi.putUserAccess(access)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  setLevelAccess(level: string) {
    console.log("u are changing user level to " + level);

    if (level == 'Admin'){
      this.accessForm.accounts_access = true;
      this.accessForm.action_plan_access = true;
      this.accessForm.admin_access = true;
      this.accessForm.attendance_access = true;
      this.accessForm.committees_access = true;
      this.accessForm.dues_access = true;
      this.accessForm.executives_access = true;
      this.accessForm.fiscal_year_access = true;
      this.accessForm.groups_access = true;
      this.accessForm.meetings_access = true;
      this.accessForm.members_access = true;
      this.accessForm.portal_access = true;
      this.accessForm.settings_access = true;
    }
    else if (level == 'Manager'){
      this.accessForm.accounts_access = true;
      this.accessForm.action_plan_access = true;
      this.accessForm.admin_access = false;
      this.accessForm.attendance_access = true;
      this.accessForm.committees_access = true;
      this.accessForm.dues_access = true;
      this.accessForm.executives_access = true;
      this.accessForm.fiscal_year_access = true;
      this.accessForm.groups_access = true;
      this.accessForm.meetings_access = true;
      this.accessForm.members_access = true;
      this.accessForm.portal_access = false;
      this.accessForm.settings_access = false;
    }
    else if (level == 'Staff'){
      this.accessForm.accounts_access = false;
      this.accessForm.action_plan_access = false;
      this.accessForm.admin_access = false;
      this.accessForm.attendance_access = false;
      this.accessForm.committees_access = false;
      this.accessForm.dues_access = false;
      this.accessForm.executives_access = false;
      this.accessForm.fiscal_year_access = false;
      this.accessForm.groups_access = false;
      this.accessForm.meetings_access = false;
      this.accessForm.members_access = false;
      this.accessForm.portal_access = false;
      this.accessForm.settings_access = false;
    }
  }

}
