import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Chart, registerables } from 'chart.js';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { BudgetApiService } from 'projects/personal/src/app/services/modules-api/budget-api/budget-api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private budgetApi: BudgetApiService
  ) { 
    Chart.register(...registerables);
  }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Dashboard", url: "/home/budget/dashboard" },
  ];

  Data: any;
  ioeMonthData: any;

  budgetMonthCount: number = 0;
  incomeMonthTotal: number = 0;
  expenditureMonthTotal: number = 0;

  ioePieChartConfig: any;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initIoELineChart();
  }

  initIoELineChart(){
    let ioePieChartElement = this.elementRef.nativeElement.querySelector('#ioePieChart')

    this.ioePieChartConfig = new Chart(ioePieChartElement, {
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
