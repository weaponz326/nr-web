import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Chart, registerables } from 'chart.js';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { AdminApiService } from 'projects/enterprise/src/app/services/modules-api/admin-api/admin-api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private adminApi: AdminApiService
  ) { 
    Chart.register(...registerables);
  }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Dashboard", url: "/home/admin/dashboard" },
  ];

  accountUserCount: number = 0;

  ngOnInit(): void {
    this.getAccountUserCount();
  }

  getAccountUserCount(){
    this.adminApi.getAccountUserCount()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.accountUserCount = res.count;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
