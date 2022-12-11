import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AdminApiService } from 'projects/enterprise/src/app/services/modules-api/admin-api/admin-api.service';

import { UserAccess } from 'projects/enterprise/src/app/models/modules/admin/admin.model';


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

  // accessForm: UserAccess = {
  accessForm = {
    account: this.customCookie.getCookie('enterprise_id') as string,
    accounts_access: false,
    admin_access: false,
    appraisal_access: false,
    assets_access: false,
    attendance_access: false,
    budget_access: false,
    employees_access: false,
    files_access: false,
    fiscal_year_access: false,
    leave_access: false,
    ledger_access: false,
    letters_access: false,
    payroll_access: false,
    portal_access: false,
    procurement_access: false,
    reception_access: false,
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
          this.accessForm.admin_access = res.admin_access;
          this.accessForm.appraisal_access = res.appraisal_access;
          this.accessForm.assets_access = res.assets_access;
          this.accessForm.attendance_access = res.attendance_access;
          this.accessForm.budget_access = res.budget_access;
          this.accessForm.employees_access = res.employees_access;
          this.accessForm.files_access = res.files_access;
          this.accessForm.fiscal_year_access = res.fiscal_year_access;
          this.accessForm.leave_access = res.leave_access;
          this.accessForm.ledger_access = res.ledger_access;
          this.accessForm.letters_access = res.letters_access;
          this.accessForm.payroll_access = res.payroll_access;
          this.accessForm.portal_access = res.portal_access;
          this.accessForm.procurement_access = res.procurement_access;
          this.accessForm.reception_access = res.reception_access;
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
      account: this.customCookie.getCookie('enterprise_id') as string,
      accounts_access: this.accessForm.accounts_access,
      admin_access: this.accessForm.admin_access,
      appraisal_access: this.accessForm.appraisal_access,
      assets_access: this.accessForm.assets_access,
      attendance_access: this.accessForm.attendance_access,
      budget_access: this.accessForm.budget_access,
      employees_access: this.accessForm.employees_access,
      files_access: this.accessForm.files_access,
      fiscal_year_access: this.accessForm.fiscal_year_access,
      leave_access: this.accessForm.leave_access,
      ledger_access: this.accessForm.ledger_access,
      letters_access: this.accessForm.letters_access,
      payroll_access: this.accessForm.payroll_access,
      portal_access: this.accessForm.portal_access,
      procurement_access: this.accessForm.procurement_access,
      reception_access: this.accessForm.reception_access,
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
    
    if (level == 'Admin') {
      this.accessForm.accounts_access = true;
      this.accessForm.admin_access = true;
      this.accessForm.appraisal_access = true;
      this.accessForm.assets_access = true;
      this.accessForm.attendance_access = true;
      this.accessForm.budget_access = true;
      this.accessForm.employees_access = true;
      this.accessForm.files_access = true;
      this.accessForm.leave_access = true;
      this.accessForm.fiscal_year_access = true;
      this.accessForm.ledger_access = true;
      this.accessForm.letters_access = true;
      this.accessForm.payroll_access = true;
      this.accessForm.portal_access = true;
      this.accessForm.procurement_access = true;
      this.accessForm.reception_access = true;
      this.accessForm.settings_access = true;
    }
    else if (level == 'Manager') {
      this.accessForm.accounts_access =true;
      this.accessForm.admin_access= false;
      this.accessForm.appraisal_access =true;
      this.accessForm.assets_access =true;
      this.accessForm.attendance_access =true;
      this.accessForm.budget_access =true;
      this.accessForm.employees_access =true;
      this.accessForm.files_access =true;
      this.accessForm.fiscal_year_access =true;
      this.accessForm.leave_access =true;
      this.accessForm.ledger_access =true;
      this.accessForm.letters_access =true;
      this.accessForm.payroll_access =true;
      this.accessForm.portal_access= false;
      this.accessForm.procurement_access =true;
      this.accessForm.reception_access =true;
      this.accessForm.settings_access= false;
    }
    else if (level == 'Staff') {
      this.accessForm.accounts_access = false;
      this.accessForm.admin_access = false;
      this.accessForm.appraisal_access = false;
      this.accessForm.assets_access = false;
      this.accessForm.attendance_access = false;
      this.accessForm.budget_access = false;
      this.accessForm.employees_access = false;
      this.accessForm.files_access = false;
      this.accessForm.leave_access = false;
      this.accessForm.fiscal_year_access = false;
      this.accessForm.ledger_access = false;
      this.accessForm.letters_access = false;
      this.accessForm.payroll_access = false;
      this.accessForm.portal_access = false;
      this.accessForm.procurement_access = false;
      this.accessForm.reception_access = false;
      this.accessForm.settings_access = false;
    }
  }

}
