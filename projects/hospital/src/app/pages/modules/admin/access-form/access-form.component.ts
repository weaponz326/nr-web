import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AdminApiService } from 'projects/hospital/src/app/services/modules-api/admin-api/admin-api.service';

import { UserAccess } from 'projects/hospital/src/app/models/modules/admin/admin.model';


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
    account: this.customCookie.getCookie('hospital_id') as string,
    admin_access: false,
    portal_access: false,
    settings_access: false,
    patients_access: false,
    appointments_access: false,
    staff_access: false,
    bills_access: false,
    doctors_access: false,
    laboratory_access: false,
    payments_access: false,
    nurses_access: false,
    prescriptions_access: false,
    diagnosis_access: false,
    drugs_access: false,
    wards_access: false,
    admissions_access: false,
    dispensary_access: false,
    roster_access: false,
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
          this.accessForm.patients_access = res.patients_access;
          this.accessForm.appointments_access = res.appointments_access;
          this.accessForm.staff_access = res.staff_access;
          this.accessForm.bills_access = res.bills_access;
          this.accessForm.doctors_access = res.doctors_access;
          this.accessForm.laboratory_access = res.laboratory_access;
          this.accessForm.payments_access = res.payments_access;
          this.accessForm.nurses_access = res.nurses_access;
          this.accessForm.prescriptions_access = res.prescriptions_access;
          this.accessForm.diagnosis_access = res.diagnosis_access;
          this.accessForm.drugs_access = res.drugs_access;
          this.accessForm.wards_access = res.wards_access;
          this.accessForm.admissions_access = res.admissions_access;
          this.accessForm.dispensary_access = res.dispensary_access;
          this.accessForm.roster_access = res.roster_access;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  updateUserAccess(){
    let access: UserAccess = {
      account: this.customCookie.getCookie('hospital_id') as string,      
      admin_access: this.accessForm.admin_access,
      portal_access: this.accessForm.portal_access,
      settings_access: this.accessForm.settings_access,
      patients_access: this.accessForm.patients_access,
      appointments_access: this.accessForm.appointments_access,
      staff_access: this.accessForm.staff_access,
      bills_access: this.accessForm.bills_access,
      doctors_access: this.accessForm.doctors_access,
      laboratory_access: this.accessForm.laboratory_access,
      payments_access: this.accessForm.payments_access,
      nurses_access: this.accessForm.nurses_access,
      prescriptions_access: this.accessForm.prescriptions_access,
      diagnosis_access: this.accessForm.diagnosis_access,
      drugs_access: this.accessForm.drugs_access,
      wards_access: this.accessForm.wards_access,
      admissions_access: this.accessForm.admissions_access,
      dispensary_access: this.accessForm.dispensary_access,
      roster_access: this.accessForm.roster_access,
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
      this.accessForm.admin_access = true;
      this.accessForm.portal_access = true;
      this.accessForm.settings_access = true;
      this.accessForm.patients_access = true;
      this.accessForm.appointments_access = true;
      this.accessForm.staff_access = true;
      this.accessForm.bills_access = true;
      this.accessForm.doctors_access = true;
      this.accessForm.laboratory_access = true;
      this.accessForm.payments_access = true;
      this.accessForm.nurses_access = true;
      this.accessForm.prescriptions_access = true;
      this.accessForm.diagnosis_access = true;
      this.accessForm.drugs_access = true;
      this.accessForm.wards_access = true;
      this.accessForm.admissions_access = true;
      this.accessForm.dispensary_access = true;
      this.accessForm.roster_access = true;
    }
    else if (level == 'Manager') {
      this.accessForm.admin_access = false;
      this.accessForm.portal_access = false;
      this.accessForm.settings_access = false;
      this.accessForm.patients_access = true;
      this.accessForm.appointments_access = true;
      this.accessForm.staff_access = true;
      this.accessForm.bills_access = true;
      this.accessForm.doctors_access = true;
      this.accessForm.laboratory_access = true;
      this.accessForm.payments_access = true;
      this.accessForm.nurses_access = true;
      this.accessForm.prescriptions_access = true;
      this.accessForm.diagnosis_access = true;
      this.accessForm.drugs_access = true;
      this.accessForm.wards_access = true;
      this.accessForm.admissions_access = true;
      this.accessForm.dispensary_access = true;
      this.accessForm.roster_access = true;
    }
    else if (level == 'Staff') {
      this.accessForm.admin_access = false;
      this.accessForm.portal_access = false;
      this.accessForm.settings_access = false;
      this.accessForm.patients_access = false;
      this.accessForm.appointments_access = false;
      this.accessForm.staff_access = false;
      this.accessForm.bills_access = false;
      this.accessForm.doctors_access = false;
      this.accessForm.laboratory_access = false;
      this.accessForm.payments_access = false;
      this.accessForm.nurses_access = false;
      this.accessForm.prescriptions_access = false;
      this.accessForm.diagnosis_access = false;
      this.accessForm.drugs_access = false;
      this.accessForm.wards_access = false;
      this.accessForm.admissions_access = false;
      this.accessForm.dispensary_access = false;
      this.accessForm.roster_access = false;
    }
  }

}
