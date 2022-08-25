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

  calendarMonthData: any;
  ScheduleMonthData: any;

  calendarMonthCount: number = 0;
  scheduleMonthCount: number = 0;

  scheduleLineChartConfig: any;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initScheduleLineChart();
  }

  initScheduleLineChart(){
    let scheduleLineChartElement = this.elementRef.nativeElement.querySelector('#scheduleLineChart')

    this.scheduleLineChartConfig = new Chart(scheduleLineChartElement, {
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
