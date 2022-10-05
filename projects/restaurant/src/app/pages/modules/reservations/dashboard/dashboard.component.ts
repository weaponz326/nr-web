import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Chart, registerables } from 'chart.js';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { ReservationsApiService } from 'projects/restaurant/src/app/services/modules-api/reservations-api/reservations-api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private reservationsApi: ReservationsApiService
  ) { 
    Chart.register(...registerables);
  }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Dashboard", url: "/home/reservations/dashboard" },
  ];

  reservationsMonthLineDataSets: any[] = [];
  reservationsMonthLineLabels: any[] = [];

  allReservationCount: number = 0;

  reservationsLineChartConfig: any;

  ngOnInit(): void {
    this.getAllReservationCount();
    this.getReservationAnnotate();
  }

  ngAfterViewInit(): void {
    this.initReservationLineChart();
  }

  initReservationLineChart(){
    let reservationsLineChartElement = this.elementRef.nativeElement.querySelector('#reservationsLineChart')

    this.reservationsLineChartConfig = new Chart(reservationsLineChartElement, {
      type: "line",
      data: {
        labels: this.reservationsMonthLineLabels,
        datasets: [{
          label: "Reservations",
          data: this.reservationsMonthLineDataSets,
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

  getAllReservationCount(){
    this.reservationsApi.getReservationCount()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.allReservationCount = res.count;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getReservationAnnotate(){
    this.reservationsApi.getReservationAnnotate()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.reservationsMonthLineLabels = res.map((x: any) => x.date)
          this.reservationsMonthLineDataSets = res.map((x: any) => x.count)

          this.reservationsLineChartConfig.destroy();
          this.initReservationLineChart();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
