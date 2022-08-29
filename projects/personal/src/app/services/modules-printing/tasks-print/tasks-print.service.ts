import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { PdfPrintService } from '../../module-utilities/pdf-print/pdf-print.service';
import { TasksApiService } from '../../modules-api/tasks-api/tasks-api.service';


@Injectable({
  providedIn: 'root'
})
export class TasksPrintService {

  constructor(
    private pdfPrint: PdfPrintService,
    private tasksApi: TasksApiService,
  ) { }

  // all task groups

  async printAllTaskGroups(){
    const results$ = this.tasksApi.getUserTaskGroups(1, 100, "");
    const taskGroupsGridData: any = await lastValueFrom(results$);

    var body = [['Task Group', 'Created At']];

    for (let data of taskGroupsGridData.results){
      var row = [];
      let rowData: any = data;
      row.push(rowData.task_group);
      row.push(rowData.created_at);
      body.push(row);
    }

    let content = [
      {
        header: 'netRink Personal - All Task Groups',
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['65%', '35%',],
          body: body
        }
      }
    ]

    this.pdfPrint.openPdf(content);
  }

  // all task items

  async printAllTaskItems(){
    const results$ = this.tasksApi.getUserTaskItems(1, 100, "");
    const taskItemsGridData: any = await lastValueFrom(results$);

    var body = [['Task Item', 'Priority', 'Start Date', 'End Date', 'Status']];

    for (let data of taskItemsGridData.results){
      var row = [];
      let rowData: any = data;
      row.push(rowData.task_item);
      row.push(rowData.priority);
      row.push(rowData.start_date);
      row.push(rowData.end_date);
      row.push(rowData.status);
      body.push(row);
    }

    let content = [
      {
        header: 'netRink Personal - All Task Items',
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['36%', '14%', '18%', '18%', '14%'],
          body: body
        }
      }
    ]

    this.pdfPrint.openPdf(content);
  }

}
