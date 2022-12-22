import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { PdfPrintService } from '../../module-utilities/pdf-print/pdf-print.service';
import { CalendarApiService } from '../../modules-api/calendar-api/calendar-api.service';


@Injectable({
  providedIn: 'root'
})
export class CalendarPrintService {

  constructor(
    private pdfPrint: PdfPrintService,
    private calendarApi: CalendarApiService,
  ) { }

  // all calendars

  async printAllCalendars(){
    const results$ = this.calendarApi.getUserCalendars(1, 100, "");
    const calendarsGridData: any = await lastValueFrom(results$);

    var body = [['Calendar Name', 'Created At']];

    for (let data of calendarsGridData.results){
      var row = [];
      let rowData: any = data;
      row.push(rowData.calendar_name);
      row.push(rowData.created_at);

      body.push(row);
    }

    let content = [
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['65%', '35%'],
          body: body
        }
      }
    ]

    var header = 'netRink Personal - All Calendars';
    this.pdfPrint.openPdf(header, content);
  }

  // all schedules

  async printAllSchedules(){
    const results$: any = this.calendarApi.getUserSchedules(1, 100, "");
    const schedulesGridData: any = await lastValueFrom(results$);

    var body = [['Schedule Name', 'Start Date', 'End Date', 'Status']];

    for (let data of schedulesGridData.results){
      var row = [];
      let rowData: any = data;
      row.push(rowData.schedule_name);
      row.push(rowData.start_date);
      row.push(rowData.end_date);
      row.push(rowData.status);

      body.push(row);
    }

    let content = [
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['35%', '23%', '23%', '19%'],
          body: body
        }
      }
    ]

    var header = 'netRink Personal - All Schedules';
    this.pdfPrint.openPdf(header, content);
  }

}
