import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Chart, registerables } from 'chart.js';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { PortalApiService } from 'projects/personal/src/app/services/modules-api/portal-api/portal-api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private portalApi: PortalApiService
  ) { 
    Chart.register(...registerables);
  }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Dashboard", url: "/home/portal/dashboard" },
  ];

  rinkInMonthData: any;
  rinkOutMonthData: any;

  rinkInMonthCount: number = 0;
  rinkOutMonthCount: number = 0;

  rinkLineChartConfig: any;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initRinkLineChart();
  }

  initRinkLineChart(){
    let rinkLineChartElement = this.elementRef.nativeElement.querySelector('#rinkLineChart')

    this.rinkLineChartConfig = new Chart(rinkLineChartElement, {
      type: "line",
      data: {
        labels: [],
        datasets: [{
          data: [],
        }]
      },
      options: {},
    });
  }

}
