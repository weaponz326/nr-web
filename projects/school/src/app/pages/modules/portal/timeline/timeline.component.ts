import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { PortalApiService } from 'projects/school/src/app/services/modules-api/portal-api/portal-api.service';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private portalApi: PortalApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Timeline", url: "/home/portal/timeline" },
  ];

  schoolId = this.customCookie.getCookie('restaurant_id');
  rinksData: any[] = [];

  isRinksLoading = false;

  ngOnInit(): void {
    this.getAllRinks(1, 10, "");
  }

  getAllRinks(page: any, size: any, sortField: any){
    this.isRinksLoading = true;

    this.portalApi.getAllRinks(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.rinksData = res;
          this.isRinksLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isRinksLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  viewRink(rinkId: any){
    sessionStorage.setItem('school_rink_id', rinkId);
    this.router.navigateByUrl('/home/portal/view-rink');
  }


}
