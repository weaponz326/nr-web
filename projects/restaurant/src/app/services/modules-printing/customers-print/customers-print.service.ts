import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { PdfPrintService } from 'projects/personal/src/app/services/module-utilities/pdf-print/pdf-print.service';
import { CustomersApiService } from 'projects/restaurant/src/app/services/modules-api/customers-api/customers-api.service';


@Injectable({
  providedIn: 'root'
})
export class CustomersPrintService {

  constructor(
    private pdfPrint: PdfPrintService,
    private customersApi: CustomersApiService
  ) { }

  // all customers

  async printAllCustomers(){
    const results$ = this.customersApi.getAccountCustomer(1, 100, "");
    const customersGridData = await lastValueFrom(results$);

    var body = [['Customer ID', 'Customer Name', 'Phone No.']];

    for (let data of customersGridData.results){
      var row = [];
      let rowData: any = data;
      row.push(rowData.customer_code);
      row.push(rowData.customer_name);
      row.push(rowData.phone);

      body.push(row);
    }

    let content = [
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['25%', '50%', '25%'],
          body: body
        }
      }
    ]

    var header = 'netRink Restaurant - All Customers';
    this.pdfPrint.openPdf(header, content);
  }

  // view customer

  async printViewCustomer(){
    const results$ = this.customersApi.getCustomer();
    const customerFormData = await lastValueFrom(results$);

    let formData: any = customerFormData;

    let content = [
      {
        columns: [
          [
            { text: 'Customer Code: ' + formData.customer_code },
            { text: 'Customer Name: ' + formData.customer_name },
            { text: 'Customer Type: ' + formData.customer_type },
            { text: 'Allergies: ' + formData.allergies },
            { text: 'Preferences: ' + formData.preferences },
            { text: 'Phone No.: ' + formData.phone },
            { text: 'Email: ' + formData.email },
            { text: 'Address: ' + formData.address },
            { text: 'state: ' + formData.state },
            { text: 'city: ' + formData.city },
          ],
        ]
      },
    ]

    var header = 'netRink Restaurant - View Customer';
    this.pdfPrint.openPdf(header, content);
  }
  
}
