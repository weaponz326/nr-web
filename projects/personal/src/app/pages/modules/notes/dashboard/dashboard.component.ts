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

  noteMonthData: any;

  noteMonthCount: number = 0;

  noteLineChartConfig: any;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initNoteLineChart();
  }

  initNoteLineChart(){
    let noteLineChartElement = this.elementRef.nativeElement.querySelector('#noteLineChart')

    this.noteLineChartConfig = new Chart(noteLineChartElement, {
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
