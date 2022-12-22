import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { PdfPrintService } from 'projects/personal/src/app/services/module-utilities/pdf-print/pdf-print.service';
import { StaffApiService } from 'projects/restaurant/src/app/services/modules-api/staff-api/staff-api.service';


@Injectable({
  providedIn: 'root'
})
export class StaffPrintService {

  constructor(
    private pdfPrint: PdfPrintService,
    private staffApi: StaffApiService
  ) { }

  async printAllStaff(){
    const results$ = this.staffApi.getAccountStaff(1, 100, "");
    const menuGroupGridData = await lastValueFrom(results$);

    var body = [['Staff ID', 'Staff Name', 'Department', 'Job']];

    for (let data of menuGroupGridData.results){
      var row = [];
      let rowData: any = data;
      row.push(rowData.staff_code);
      row.push(rowData.first_name + " " + rowData.last_name);
      row.push(rowData.department);
      row.push(rowData.job);
      body.push(row);
    }

    let content = [
      {
        header: 'netRink Restaurant - All Staff',
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['15%', '35%', '25%', '25%'],
          body: body
        }
      }
    ]

    var header = 'netRink Restaurant - All Staff';
    this.pdfPrint.openPdf(header, content);
  }

  // view staff

  async printViewStaff(){
    const results$ = this.staffApi.getStaff();
    const staffFormData = await lastValueFrom(results$);

    let formData: any = staffFormData;

    let content = [
      { text: 'Personal Details', bold: true, margin: [0, 20, 0, 10] },
      {
        columns: [
          [
            { text: 'First Name: ' + formData.first_name },
            { text: 'Last Name: ' + formData.last_name },
            { text: 'Sex: ' + formData.sex },
            { text: 'Date of Birth: ' + formData.date_of_birth },
          ],
          [
            { text: 'Nationality: ' + formData.nationality },
            { text: 'Religion: ' + formData.religion },
          ]
        ]
      },
      { text: 'Contact Details', bold: true, margin: [0, 20, 0, 10] },
      {
        columns: [
          [
            { text: 'Phone No.: ' + formData.phone },
            { text: 'Email: ' + formData.email },
            { text: 'Address: ' + formData.address },
          ],
          [
            { text: 'State/Region: ' + formData.state },
            { text: 'city/Town: ' + formData.city },
            { text: 'Post Code: ' + formData.post_code },
          ]
        ]
      },
      { text: 'Staff Details', bold: true, margin: [0, 20, 0, 10] },
      {
        columns: [
          [
            { text: 'Staff ID: ' + formData.staff_code },
          ],
          [
            { text: 'Department: ' + formData.department },
            { text: 'Job: ' + formData.job },
          ]
        ]
      },
    ]

    var header = 'netRink Restaurant - View Staff';
    this.pdfPrint.openPdf(header, content);
  }

}
