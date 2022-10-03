import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Chart, registerables } from 'chart.js';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { NotesApiService } from 'projects/personal/src/app/services/modules-api/notes-api/notes-api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private notesApi: NotesApiService
  ) { 
    Chart.register(...registerables);
  }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Dashboard", url: "/home/notes/dashboard" },
  ];

  noteMonthDataSets: any[] = [];
  noteMonthLabels: any[] = [];

  noteMonthCount: number = 0;

  noteLineChartConfig: any;

  ngOnInit(): void {
    this.getNoteCount();
    this.getNoteAnnotate();
  }

  ngAfterViewInit(): void {
    this.initNoteLineChart();
  }

  initNoteLineChart(){
    let noteLineChartElement = this.elementRef.nativeElement.querySelector('#noteLineChart')

    this.noteLineChartConfig = new Chart(noteLineChartElement, {
      type: "line",
      data: {
        labels: this.noteMonthLabels,
        datasets: [{
          label: "Notes",
          data: this.noteMonthDataSets,
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

  getNoteCount(){
    this.notesApi.getNoteCount()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.noteMonthCount = res.count;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getNoteAnnotate(){
    this.notesApi.getNoteAnnotate()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.noteMonthDataSets = res.map((x: any) => x.count)
          this.noteMonthLabels = res.map((x: any) => x.date)

          this.noteLineChartConfig.destroy();
          this.initNoteLineChart();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
