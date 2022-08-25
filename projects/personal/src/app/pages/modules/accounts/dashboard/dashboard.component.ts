import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Chart, registerables } from 'chart.js';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { AccountsApiService } from 'projects/personal/src/app/services/modules-api/accounts-api/accounts-api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private accountsApi: AccountsApiService
  ) { 
    Chart.register(...registerables);
  }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Dashboard", url: "/home/accounts/dashboard" },
  ];

  accountMonthData: any;
  CnDMonthData: any;

  allAccountCount: number = 0;
  creditMonthTotal: number = 0;
  debitMonthTotal: number = 0;

  cndLineChartConfig: any;
  cndPieChartConfig: any;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initCnDLineChart();
    this.initCnDPieChart();
  }

  initCnDLineChart(){
    let cndLineChartElement = this.elementRef.nativeElement.querySelector('#cndLineChart')

    this.cndLineChartConfig = new Chart(cndLineChartElement, {
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

  initCnDPieChart(){
    let cndPieChartElement = this.elementRef.nativeElement.querySelector('#cndPieChart')

    this.cndPieChartConfig = new Chart(cndPieChartElement, {
      type: "pie",
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
