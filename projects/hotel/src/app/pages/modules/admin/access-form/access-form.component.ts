import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AdminApiService } from 'projects/hotel/src/app/services/modules-api/admin-api/admin-api.service';

import { UserAccess } from 'projects/hotel/src/app/models/modules/admin/admin.model';


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
    account: this.customCookie.getCookie('hotel_id') as string,
    admin_access: false,
    assets_access: false,
    bills_access: false,
    bookings_access: false,
    checkin_access: false,
    guests_access: false,
    house_keeping_access: false,
    payments_access: false,
    portal_access: false,
    rooms_access: false,
    roster_access: false,
    services_access: false,
    settings_access: false,
    staff_access: false,
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
          this.accessForm.assets_access = res.assets_access;
          this.accessForm.bills_access = res.bills_access;
          this.accessForm.bookings_access = res.bookings_access;
          this.accessForm.checkin_access = res.checkin_access;
          this.accessForm.guests_access = res.guests_access;
          this.accessForm.house_keeping_access = res.house_keeping_access;
          this.accessForm.payments_access = res.payments_access;
          this.accessForm.portal_access = res.portal_access;
          this.accessForm.rooms_access = res.rooms_access;
          this.accessForm.roster_access = res.roster_access;
          this.accessForm.services_access = res.services_access;
          this.accessForm.settings_access = res.settings_access;
          this.accessForm.staff_access = res.staff_access;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  updateUserAccess(){
    let access: UserAccess = {
      account: this.customCookie.getCookie('hotel_id') as string,      
      admin_access: this.accessForm.admin_access,
      assets_access: this.accessForm.assets_access,
      bills_access: this.accessForm.bills_access,
      bookings_access: this.accessForm.bookings_access,
      checkin_access: this.accessForm.checkin_access,
      guests_access: this.accessForm.guests_access,
      house_keeping_access: this.accessForm.house_keeping_access,
      payments_access: this.accessForm.payments_access,
      portal_access: this.accessForm.portal_access,
      rooms_access: this.accessForm.rooms_access,
      roster_access: this.accessForm.roster_access,
      services_access: this.accessForm.services_access,
      settings_access: this.accessForm.settings_access,
      staff_access: this.accessForm.staff_access,
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
      this.accessForm.assets_access = true;
      this.accessForm.bills_access = true;
      this.accessForm.bookings_access = true;
      this.accessForm.checkin_access = true;
      this.accessForm.guests_access = true;
      this.accessForm.house_keeping_access = true;
      this.accessForm.payments_access = true;
      this.accessForm.portal_access = true;
      this.accessForm.rooms_access = true;
      this.accessForm.roster_access = true;
      this.accessForm.services_access = true;
      this.accessForm.settings_access = true;
      this.accessForm.staff_access = true;
    }
    else if (level == 'Manager') {
      this.accessForm.admin_access = false;
      this.accessForm.assets_access = true;
      this.accessForm.bills_access = true;
      this.accessForm.bookings_access = true;
      this.accessForm.checkin_access = true;
      this.accessForm.guests_access = true;
      this.accessForm.house_keeping_access = true;
      this.accessForm.payments_access = true;
      this.accessForm.portal_access = false;
      this.accessForm.rooms_access = true;
      this.accessForm.roster_access = true;
      this.accessForm.services_access = true;
      this.accessForm.settings_access = false;
      this.accessForm.staff_access = true;
    }
    else if (level == 'Staff') {
      this.accessForm.admin_access = false;
      this.accessForm.assets_access = false;
      this.accessForm.bills_access = false;
      this.accessForm.bookings_access = false;
      this.accessForm.checkin_access = false;
      this.accessForm.guests_access = false;
      this.accessForm.house_keeping_access = false;
      this.accessForm.payments_access = false;
      this.accessForm.portal_access = false;
      this.accessForm.rooms_access = false;
      this.accessForm.roster_access = false;
      this.accessForm.services_access = false;
      this.accessForm.settings_access = false;
      this.accessForm.staff_access = false;
    }
  }

}
