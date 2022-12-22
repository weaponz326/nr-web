import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { PdfPrintService } from '../../module-utilities/pdf-print/pdf-print.service';
import { NotesApiService } from '../../modules-api/notes-api/notes-api.service';


@Injectable({
  providedIn: 'root'
})
export class NotesPrintService {

  constructor(
    private pdfPrint: PdfPrintService,
    private notesApi: NotesApiService,
  ) { }

  // all notes

  async printAllNotes(){
    const results$ = this.notesApi.getUserNotes(1, 100, "");
    const notesGridData: any = await lastValueFrom(results$);

    var body = [['Title', 'Created At', 'Last Updated']];

    for (let data of notesGridData.results){
      var row = [];
      let rowData: any = data;
      row.push(rowData.title);
      row.push(rowData.created_at);
      row.push(rowData.updated_at);

      body.push(row);
    }

    let content = [
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['50%', '25%', '25%'],
          body: body
        }
      }
    ]

    var header = 'netRink Personal - All Notes';
    this.pdfPrint.openPdf(header, content);
  }

}
