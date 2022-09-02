import { Component, OnInit, ViewChild } from '@angular/core';
import { AccessToastComponent } from 'projects/personal/src/app/components/module-utilities/access-toast/access-toast.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

@Component({
  selector: 'app-module-home',
  templateUrl: './module-home.page.html',
  styleUrls: ['./module-home.page.scss']
})
export class ModuleHomePage implements OnInit {

  constructor(
    // private adminApi: AdminApiService
  ) { }

  @ViewChild('accessToastComponentReference', { read: AccessToastComponent, static: false }) accessToast!: AccessToastComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  access: any;

  isAccessLoading = false;

  ngOnInit(): void {
    this.getUserAccess();
  }

  getUserAccess() {
    this.isAccessLoading = true;

    // this.adminApi.getUserAccess()
    //   .then(
    //     (res: any) => {
    //       console.log(res);

    //       this.access = res.data();
    //       const data = JSON.stringify(res.data());
    //       localStorage.setItem("restaurantUserAccess", data);

    //       this.isAccessLoading = false;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isAccessLoading = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  checkAccess(module: string){
    console.log(this.access);

    if (module == "admin" && !this.access.admin_access)
      this.accessToast.openToast();
    else if (module == "portal" && !this.access.portal_access)
      this.accessToast.openToast();
    else if (module == "settings" && !this.access.settings_access)
      this.accessToast.openToast();
    else if (module == "menu" && !this.access.menu_access)
      this.accessToast.openToast();
    else if (module == "staff" && !this.access.staff_access)
      this.accessToast.openToast();
    else if (module == "tables" && !this.access.tables_access)
      this.accessToast.openToast();
    else if (module == "customers" && !this.access.customers_access)
      this.accessToast.openToast();
    else if (module == "deliveries" && !this.access.deliveries_access)
      this.accessToast.openToast();
    else if (module == "payments" && !this.access.payments_access)
      this.accessToast.openToast();
    else if (module == "roster" && !this.access.roster_access)
      this.accessToast.openToast();
    else if (module == "reservations" && !this.access.reservations_access)
      this.accessToast.openToast();
    else if (module == "orders" && !this.access.orders_access)
      this.accessToast.openToast();
    else
      console.log("Access granted :)");
  }

}
