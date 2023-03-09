import { Component, OnInit, ViewChild } from '@angular/core';

import { AccessToastComponent } from 'projects/personal/src/app/components/module-utilities/access-toast/access-toast.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { AdminApiService } from '../../services/modules-api/admin-api/admin-api.service';


@Component({
  selector: 'app-module-home',
  templateUrl: './module-home.page.html',
  styleUrls: ['./module-home.page.scss']
})
export class ModuleHomePage implements OnInit {

  constructor(
    private adminApi: AdminApiService
  ) { }

  @ViewChild('accessToastComponentReference', { read: AccessToastComponent, static: false }) accessToast!: AccessToastComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  access: any;
  level: any;

  isAccessLoading = false;

  ngOnInit(): void {
    this.getAccountUserLevel();
    this.getAccessAccess();
  }

  getAccountUserLevel() {
    this.adminApi.getAccountUserLevel()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.level = res;
          localStorage.setItem("enterpriseUserLevel", JSON.stringify(res));
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getAccessAccess() {
    this.isAccessLoading = true;

    this.adminApi.getAccessAccess()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.access = res;
          localStorage.setItem("enterpriseUserAccess", JSON.stringify(res));

          this.isAccessLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isAccessLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  checkAccess(module: string){
    console.log(this.access);

    if (module == "admin" && (!this.access.admin_access || this.level.access_level == "Staff"))
      this.accessToast.openToast();
    else if (module == "portal" && (!this.access.portal_access || this.level.access_level == "Staff"))
      this.accessToast.openToast();
    else if (module == "settings" && (!this.access.settings_access || this.level.access_level == "Staff"))
      this.accessToast.openToast();
    else if (module == "attendance" && !this.access.attendance_access)
      this.accessToast.openToast();
    else if (module == "assets" && !this.access.assets_access)
      this.accessToast.openToast();
    else if (module == "leave" && !this.access.leave_access)
      this.accessToast.openToast();
    else if (module == "budget" && !this.access.budget_access)
      this.accessToast.openToast();
    else if (module == "procurement" && !this.access.procurement_access)
      this.accessToast.openToast();
    else if (module == "letters" && !this.access.letters_access)
      this.accessToast.openToast();
    else if (module == "appraisal" && !this.access.appraisal_access)
      this.accessToast.openToast();
    else if (module == "files" && !this.access.files_access)
      this.accessToast.openToast();
    else if (module == "employees" && !this.access.employees_access)
      this.accessToast.openToast();
    else if (module == "ledger" && !this.access.ledger_access)
      this.accessToast.openToast();
    else if (module == "reception" && !this.access.reception_access)
      this.accessToast.openToast();
    else if (module == "fiscal_year" && !this.access.fiscal_year_access)
      this.accessToast.openToast();
    else
      console.log("Access granted :)");
  }

}
