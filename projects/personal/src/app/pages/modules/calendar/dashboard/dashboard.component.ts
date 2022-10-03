import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Chart, registerables } from 'chart.js';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { CalendarApiService } from 'projects/personal/src/app/services/modules-api/calendar-api/calendar-api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private calendarApi: CalendarApiService
  ) { 
    Chart.register(...registerables);
  }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Dashboard", url: "/home/calendar/dashboard" },
  ];

  calendarMonthDataSets: any[] = [];
  scheduleMonthDataSets: any[] = [];
  calendarMonthLabels: any[] = [];
  scheduleMonthLabels: any[] = [];

  calendarMonthCount: number = 0;
  scheduleMonthCount: number = 0;

  calendarLineChartConfig: any;
  scheduleLineChartConfig: any;

  ngOnInit(): void {
    this.getCalendarCount();
    this.getScheduleCount();
    this.getCalendarAnnotate();
    this.getScheduleAnnotate();
  }

  ngAfterViewInit(): void {
    this.initScheduleLineChart();
    this.initCalendarLineChart();
  }

  initScheduleLineChart(){
    let scheduleLineChartElement = this.elementRef.nativeElement.querySelector('#scheduleLineChart')

    this.scheduleLineChartConfig = new Chart(scheduleLineChartElement, {
      type: "line",
      data: {
        labels: this.scheduleMonthLabels,
        datasets: [{
          label: "Schedules",
          data: this.scheduleMonthDataSets,
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

  initCalendarLineChart(){
    let calendarLineChartElement = this.elementRef.nativeElement.querySelector('#calendarLineChart')

    this.calendarLineChartConfig = new Chart(calendarLineChartElement, {
      type: "line",
      data: {
        labels: this.calendarMonthLabels,
        datasets: [{
          label: "Calendars",
          data: this.calendarMonthDataSets,
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

  getCalendarCount(){
    this.calendarApi.getCalendarCount()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.calendarMonthCount = res.count;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getScheduleCount(){
    this.calendarApi.getScheduleCount()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.scheduleMonthCount = res.count;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getCalendarAnnotate(){
    this.calendarApi.getCalendarAnnotate()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.calendarMonthDataSets = res.map((x: any) => x.count)
          this.calendarMonthLabels = res.map((x: any) => x.date)

          this.calendarLineChartConfig.destroy();
          this.initCalendarLineChart();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getScheduleAnnotate(){
    this.calendarApi.getScheduleAnnotate()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.scheduleMonthDataSets = res.map((x: any) => x.count)
          this.scheduleMonthLabels = res.map((x: any) => x.date)

          this.scheduleLineChartConfig.destroy();
          this.initScheduleLineChart();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
