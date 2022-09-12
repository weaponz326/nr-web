import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Chart, registerables } from 'chart.js';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { PortalApiService } from 'projects/restaurant/src/app/services/modules-api/portal-api/portal-api.service';


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

  rinkInMonthDataSets: any[] = [];
  rinkOutMonthDataSets: any[] = [];
  rinkMonthLabels: any[] = [];

  rinkInMonthCount: number = 0;
  rinkOutMonthCount: number = 0;

  rinkLineChartConfig: any;

  ngOnInit(): void {
    this.getRinkShareCount();
    this.getRinkShareAnnotate();
  }

  ngAfterViewInit(): void {
    this.initRinkLineChart();
  }

  initRinkLineChart(){
    let rinkLineChartElement = this.elementRef.nativeElement.querySelector('#rinkLineChart')

    this.rinkLineChartConfig = new Chart(rinkLineChartElement, {
      type: "line",
      data: {
        labels: this.rinkMonthLabels,
        datasets: [{
          data: this.rinkInMonthDataSets,
          fill: true
        },{
          data: this.rinkOutMonthDataSets,
          fill: true
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      },
    });
  }

  getRinkShareCount(){
    this.portalApi.getRinkShareCount()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.rinkInMonthCount = res.rink_in;
          this.rinkOutMonthCount = res.rink_out;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getRinkShareAnnotate(){
    this.portalApi.getRinkShareAnnotate()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.rinkInMonthDataSets = res.rink_in.map((x: any) => x.count)
          this.rinkOutMonthDataSets = res.rink_out.map((x: any) => x.count)
          this.rinkMonthLabels = res.rink_in.map((x: any) => x.date)

          this.rinkLineChartConfig.destroy();
          this.initRinkLineChart();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
