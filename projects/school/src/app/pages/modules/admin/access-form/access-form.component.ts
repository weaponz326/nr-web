import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie.service';
import { AdminApiService } from 'projects/school/src/app/services/modules-api/admin-api/admin-api.service';

import { UserAccess } from 'projects/school/src/app/models/modules/admin/admin.model';


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
    account: this.customCookie.getCookie('restaurant_id') as string,
    admin_access: false,
    portal_access:  false,
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

          this.accessForm.admin_access = res.admin_access;
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
    let access: UserAccess = {
      account: this.customCookie.getCookie('restaurant_id') as string,
      admin_access: this.accessForm.admin_access,
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
      this.accessForm.admin_access = true;
      this.accessForm.portal_access = true;
      this.accessForm.settings_access = true;
    }
    else if (level == 'Manager'){
      this.accessForm.admin_access =  false;
      this.accessForm.portal_access = false;
      this.accessForm.settings_access = false;
    }
    else if (level == 'Staff'){
      this.accessForm.admin_access = false;
      this.accessForm.portal_access = false;
      this.accessForm.settings_access = false;
    }
  }

}
