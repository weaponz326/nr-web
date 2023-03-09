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
          localStorage.setItem("hotelUserAccess", JSON.stringify(res));
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
          localStorage.setItem("hotelUserAccess", JSON.stringify(res));

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
    else if (module == "bills" && !this.access.bills_access)
      this.accessToast.openToast();
    else if (module == "staff" && !this.access.staff_access)
      this.accessToast.openToast();
    else if (module == "roster" && !this.access.roster_access)
      this.accessToast.openToast();
    else if (module == "guests" && !this.access.guests_access)
      this.accessToast.openToast();
    else if (module == "payments" && !this.access.payments_access)
      this.accessToast.openToast();
    else if (module == "services" && !this.access.service_access)
      this.accessToast.openToast();
    else if (module == "checkin" && !this.access.checkin_access)
      this.accessToast.openToast();
    else if (module == "bookings" && !this.access.booki_access)
      this.accessToast.openToast();
    else if (module == "rooms" && !this.access.rooms_access)
      this.accessToast.openToast();
    else if (module == "assets" && !this.access.assets_access)
      this.accessToast.openToast();
    else if (module == "housekeeping" && !this.access.housekeeping_access)
      this.accessToast.openToast();
    else
      console.log("Access granted :)");
  }

}
