import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Chart, registerables } from 'chart.js';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
// import { RosterApiService } from 'projects/hotel/src/app/services/modules-api/roster-api/roster-api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    // private rosterApi: RosterApiService
  ) { 
    Chart.register(...registerables);
  }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Dashboard", url: "/home/roster/dashboard" },
  ];

  allRosterCount: number = 0;

  rosterLineChartConfig: any;

  ngOnInit(): void {
    this.getAllRosterCount();
  }

  getAllRosterCount(){
    // this.rosterApi.getRosterCount()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.allRosterCount = res.count;
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

}
