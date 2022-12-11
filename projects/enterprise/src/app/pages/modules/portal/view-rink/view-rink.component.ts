import { Component, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { PortalApiService } from 'projects/enterprise/src/app/services/modules-api/portal-api/portal-api.service';


@Component({
  selector: 'app-view-rink',
  templateUrl: './view-rink.component.html',
  styleUrls: ['./view-rink.component.scss']
})
export class ViewRinkComponent implements OnInit {

  constructor(
    private customCookie: CustomCookieService,
    private portalApi: PortalApiService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Timeline", url: "/home/portal/timeline" },
    { text: "View Rink", url: "/home/portal/view-rink" },
  ];

  enterpriseId = this.customCookie.getCookie('enterprise_id');

  rinkData: any;

  isRinkLoading = false;

  ngOnInit(): void {
    this.getRink();
  }

  getRink(){
    this.isRinkLoading = true;

    this.portalApi.getRink()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.rinkData = res;
          sessionStorage.setItem('enterprise_rink_source_id', res.rink_source);
          this.isRinkLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isRinkLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

}
