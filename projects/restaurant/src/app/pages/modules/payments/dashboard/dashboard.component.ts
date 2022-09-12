import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Chart, registerables } from 'chart.js';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { PaymentsApiService } from 'projects/restaurant/src/app/services/modules-api/payments-api/payments-api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private paymentsApi: PaymentsApiService
  ) { 
    Chart.register(...registerables);
  }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Dashboard", url: "/home/payments/dashboard" },
  ];

  paymentsMonthLineDataSets: any[] = [];
  paymentsMonthLineLabels: any[] = [];

  allPaymentCount: number = 0;
  paymentMonthTotal: number = 0;

  paymentsLineChartConfig: any;

  ngOnInit(): void {
    this.getAllPaymentCount();
    this.getPaymentAnnotate();
  }

  ngAfterViewInit(): void {
    this.initPaymentLineChart();
  }

  initPaymentLineChart(){
    let paymentsLineChartElement = this.elementRef.nativeElement.querySelector('#paymentsLineChart')

    this.paymentsLineChartConfig = new Chart(paymentsLineChartElement, {
      type: "line",
      data: {
        labels: this.paymentsMonthLineLabels,
        datasets: [{
          data: this.paymentsMonthLineDataSets,
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

  getAllPaymentCount(){
    this.paymentsApi.getPaymentCount()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.allPaymentCount = res.count;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getPaymentAnnotate(){
    this.paymentsApi.getPaymentAnnotate()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.paymentsMonthLineLabels = res.map((x: any) => x.date)
          this.paymentsMonthLineDataSets = res.map((x: any) => x.count)

          this.paymentsLineChartConfig.destroy();
          this.initPaymentLineChart();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
