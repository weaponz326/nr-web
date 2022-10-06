import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Chart, registerables } from 'chart.js';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeliveriesApiService } from 'projects/restaurant/src/app/services/modules-api/deliveries-api/deliveries-api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private deliveriesApi: DeliveriesApiService
  ) { 
    Chart.register(...registerables);
  }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Dashboard", url: "/home/deliveries/dashboard" },
  ];

  deliveriesMonthLineDataSets: any[] = [];
  deliveriesMonthLineLabels: any[] = [];

  allDeliveryCount: number = 0;

  deliveriesLineChartConfig: any;

  ngOnInit(): void {
    this.getAllDeliveryCount();
    this.getDeliveryAnnotate();
  }

  ngAfterViewInit(): void {
    this.initDeliveryLineChart();
  }

  initDeliveryLineChart(){
    let deliveriesLineChartElement = this.elementRef.nativeElement.querySelector('#deliveriesLineChart')

    this.deliveriesLineChartConfig = new Chart(deliveriesLineChartElement, {
      type: "line",
      data: {
        labels: this.deliveriesMonthLineLabels,
        datasets: [{
          label: "deliveries",
          data: this.deliveriesMonthLineDataSets,
          fill: true,
          borderColor: "#0000ff88"
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

  getAllDeliveryCount(){
    this.deliveriesApi.getDeliveryCount()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.allDeliveryCount = res.count;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getDeliveryAnnotate(){
    this.deliveriesApi.getDeliveryAnnotate()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.deliveriesMonthLineLabels = res.map((x: any) => x.date)
          this.deliveriesMonthLineDataSets = res.map((x: any) => x.count)

          this.deliveriesLineChartConfig.destroy();
          this.initDeliveryLineChart();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
