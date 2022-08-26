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

  cndMonthLineCreditDataSets: any[] = [];
  cndMonthLineDebitDataSets: any[] = [];
  cndMonthLineLabels: any[] = [];
  cndMonthPieDataSets: any[] = [0,0];
  cndMonthPieLabels: any[] = ["Credit", "Debit"];

  allAccountCount: number = 0;
  creditMonthTotal: number = 0;
  debitMonthTotal: number = 0;

  cndLineChartConfig: any;
  cndPieChartConfig: any;

  ngOnInit(): void {
    this.getAllAccountCount();
    this.getTransactionShare();
    this.getTransactionAnnotate();
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
        labels: this.cndMonthLineLabels,
        datasets: [{
          data: this.cndMonthLineCreditDataSets,
          fill: true
        },{
          data: this.cndMonthLineDebitDataSets,
          fill: true
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      },
    });
  }

  initCnDPieChart(){
    let cndPieChartElement = this.elementRef.nativeElement.querySelector('#cndPieChart')

    this.cndPieChartConfig = new Chart(cndPieChartElement, {
      type: "pie",
      data: {
        labels: this.cndMonthPieLabels,
        datasets: [{
          data: this.cndMonthPieDataSets,
        }]
      },
      options: {},
    });
  }

  getAllAccountCount(){
    this.accountsApi.getAllAccountCount()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.allAccountCount = res.count;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getTransactionShare(){
    this.accountsApi.getTransactionShare()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.creditMonthTotal = res.credit;
          this.debitMonthTotal = res.debit;

          this.cndMonthPieDataSets[0] = res.credit;
          this.cndMonthPieDataSets[1] = res.debit;

          this.cndPieChartConfig.destroy();
          this.initCnDPieChart()
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getTransactionAnnotate(){
    this.accountsApi.getTransactionAnnotate()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.cndMonthLineLabels = res.credit.map((x: any) => x.date)
          this.cndMonthLineCreditDataSets = res.credit.map((x: any) => x.count)
          this.cndMonthLineDebitDataSets = res.debit.map((x: any) => x.count)

          this.cndLineChartConfig.destroy();
          this.initCnDLineChart();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
