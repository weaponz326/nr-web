import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { PdfPrintService } from 'projects/personal/src/app/services/module-utilities/pdf-print/pdf-print.service';
import { TablesApiService } from 'projects/restaurant/src/app/services/modules-api/tables-api/tables-api.service';


@Injectable({
  providedIn: 'root'
})
export class TablesPrintService {

  constructor(
    private pdfPrint: PdfPrintService,
    private tablesApi: TablesApiService
  ) { }

  // all tables

  async printAllTables(){
    const results$ = this.tablesApi.getAccountTable(1, 100, "");
    const tablesGridData = await lastValueFrom(results$);

    var body = [['Table No.', 'Table Type', 'Table Status']];

    for (let data of tablesGridData.results){
      var row = [];
      let rowData: any = data;
      row.push(rowData.table_number);
      row.push(rowData.table_type);
      row.push(rowData.table_status);

      body.push(row);
    }

    let content = [
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['30%', '35%', '35%'],
          body: body
        }
      }
    ]

    var header = 'netRink Restaurant - All Tables';
    this.pdfPrint.openPdf(header, content);
  }

  // view table

  async printViewTable(id: any){
    const tableFormData = await this.tablesApi.getTable(id);

    let formData: any = tableFormData;

    let content = [
      {
        columns: [
          [
            { text: 'Table No.: ' + formData.table_number },
            { text: 'Table Type: ' + formData.table_type },
            { text: 'Capcity: ' + formData.capacity },
            { text: 'Location: ' + formData.location },
            { text: 'Table Status: ' + formData.table_status },
          ],
          []
        ]
      },
    ]

    var header = 'netRink Restaurant - View Table';
    this.pdfPrint.openPdf(header, content);
  }

}
