import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { PdfPrintService } from 'projects/personal/src/app/services/module-utilities/pdf-print/pdf-print.service';
import { DeliveriesApiService } from 'projects/restaurant/src/app/services/modules-api/deliveries-api/deliveries-api.service';


@Injectable({
  providedIn: 'root'
})
export class DeliveriesPrintService {

  constructor(
    private pdfPrint: PdfPrintService,
    private deliveriesApi: DeliveriesApiService
  ) { }

  // all deliveries

  async printAllDeliveries(){
    const results$ = this.deliveriesApi.getAccountDelivery(1, 100, "");
    const deliveriesGridData = await lastValueFrom(results$);

    var body = [['Order ID', 'Customer Name', 'Delivery Location', 'Date Delivered', 'Delivery Status']];

    for (let data of deliveriesGridData.results){
      var row = [];
      let rowData: any = data;
      row.push(rowData.order.order_code);
      row.push(rowData.order.customer_name);
      row.push(rowData.delivery_location);
      row.push(rowData.delivery_date);
      row.push(rowData.delivery_status);

      body.push(row);
    }

    let content = [
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['15%', '20%', '30%', '20%', '15%'],
          body: body
        }
      }
    ]

    this.pdfPrint.openPdf(content);
  }

  // view delivery

  async printViewDelivery(){
    const results$ = this.deliveriesApi.getDelivery();
    const deliveryFormDate = await lastValueFrom(results$);

    let formData: any = deliveryFormDate;

    let content = [
      {
        columns: [
          [
            { text: 'Order ID: ' + formData.order.order_code },
            { text: 'Order Date: ' + formData.order.order_date },
            { text: 'Customer Name: ' + formData.order.customer_name },
            { text: 'Delivery Location: ' + formData.delivery_location },
            { text: 'Date Delivered: ' + formData.delivery_date },
            { text: 'Delivery Status: ' + formData.delivery_status },
          ],
          []
        ]
      },
    ]

    this.pdfPrint.openPdf(content);
  }
  
}
