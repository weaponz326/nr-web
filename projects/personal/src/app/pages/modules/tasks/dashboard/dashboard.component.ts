import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { TasksApiService } from 'projects/personal/src/app/services/modules-api/tasks-api/tasks-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private tasksApi: TasksApiService
  ) { 
    Chart.register(...registerables);
  }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Dashboard", url: "/home/tasks/dashboard" },
  ];

  taskGroupMonthData: any;
  taskItemMonthData: any;

  taskGroupMonthCount: number = 0;
  taskItemMonthCount: number = 0;
  allToDoCount: number = 0;

  taskGroupLineChartConfig: any;
  taskItemLineChartConfig: any;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initTaskGroupLineChart();
    this.initTaskItemLineChart();
  }

  initTaskGroupLineChart(){
    let taskGroupLineChartElement = this.elementRef.nativeElement.querySelector('#taskGroupLineChart')

    this.taskGroupLineChartConfig = new Chart(taskGroupLineChartElement, {
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

  initTaskItemLineChart(){
    let taskItemLineChartElement = this.elementRef.nativeElement.querySelector('#taskItemLineChart')

    this.taskGroupLineChartConfig = new Chart(taskItemLineChartElement, {
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
