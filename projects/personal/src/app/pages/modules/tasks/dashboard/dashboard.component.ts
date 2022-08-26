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

  taskGroupMonthDataSets: any[] = [];
  taskItemMonthDataSets: any[] = [];
  taskGroupMonthLabels: any[] = [];
  taskItemMonthLabels: any[] = [];

  taskGroupMonthCount: number = 0;
  taskItemMonthCount: number = 0;
  allToDoCount: number = 0;

  taskGroupLineChartConfig: any;
  taskItemLineChartConfig: any;

  ngOnInit(): void {
    this.getTaskGroupCount();
    this.getTaskItemCount();
    this.getAllToDoCount();
    this.getTaskGroupAnnotate();
    this.getTaskItemAnnotate();
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
        labels: this.taskGroupMonthLabels,
        datasets: [{
          data: this.taskGroupMonthDataSets,
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

  initTaskItemLineChart(){
    let taskItemLineChartElement = this.elementRef.nativeElement.querySelector('#taskItemLineChart')

    this.taskItemLineChartConfig = new Chart(taskItemLineChartElement, {
      type: "line",
      data: {
        labels: this.taskItemMonthLabels,
        datasets: [{
          data: this.taskItemMonthDataSets,
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

  getTaskGroupCount(){
    this.tasksApi.getTaskGroupCount()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.taskGroupMonthCount = res.count;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getTaskItemCount(){
    this.tasksApi.getTaskItemCount()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.taskItemMonthCount = res.count;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getAllToDoCount(){
    this.tasksApi.getAllToDoCount()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.allToDoCount = res.count;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getTaskGroupAnnotate(){
    this.tasksApi.getTaskGroupAnnotate()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.taskGroupMonthDataSets = res.map((x: any) => x.count)
          this.taskGroupMonthLabels = res.map((x: any) => x.date)

          this.taskGroupLineChartConfig.destroy();
          this.initTaskGroupLineChart();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getTaskItemAnnotate(){
    this.tasksApi.getTaskItemAnnotate()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.taskItemMonthDataSets = res.map((x: any) => x.count)
          this.taskItemMonthLabels = res.map((x: any) => x.date)

          this.taskItemLineChartConfig.destroy();
          this.initTaskItemLineChart();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
