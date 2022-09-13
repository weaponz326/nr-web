import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { PdfPrintService } from 'projects/personal/src/app/services/module-utilities/pdf-print/pdf-print.service';
import { PaymentsApiService } from 'projects/restaurant/src/app/services/modules-api/payments-api/payments-api.service';


@Injectable({
  providedIn: 'root'
})
export class PaymentsPrintService {

  constructor(
    private pdfPrint: PdfPrintService,
    private paymentsApi: PaymentsApiService,
  ) { }

  // all payments

  async printAllPayments(){
    const results$ = this.paymentsApi.getAccountPayment(1, 100, "");
    const paymentsGridData = await lastValueFrom(results$);

    var body = [['Payment ID', 'Payment Date', 'Amount Paid', 'Order ID', 'Customer Name']];

    for (let data of paymentsGridData.results){
      var row = [];
      let rowData: any = data;
      row.push(rowData.payment_code);
      row.push(rowData.payment_date);
      row.push(rowData.amount_paid);
      row.push(rowData.order.order_code);
      row.push(rowData.order.customer_name);
      body.push(row);
    }

    let content = [
      {
        header: 'netRink Restaurant - All Payments',
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['15%', '20%', '20%', '15%', '30%'],
          body: body
        }
      }
    ]

    this.pdfPrint.openPdf(content);
  }

  // view payment

  async printViewPayment(){
    const results$ = this.paymentsApi.getPayment();
    const paymentFormDate = await lastValueFrom(results$);

    let formData: any = paymentFormDate;

    let content = [
      {
        columns: [
          [
            { text: 'Payment ID: ' + formData.payment_code },
            { text: 'Payment Date: ' + formData.payment_date },
            { text: 'Order ID: ' + formData.order.order_code },
            { text: 'Customer Name: ' + formData.order.customer_name },
            { text: 'Amount Due: ' + formData.order.total_amount },
            { text: 'Amount Paid: ' + formData.amount_paid },
            { text: 'Balance: ' + (+formData.order.total_amount - +formData.amount_paid) },
          ],
          []
        ]
      },
    ]

    this.pdfPrint.openPdf(content);
  }

  async printPaymentRoll(){
    const results$ = this.paymentsApi.getPayment();
    const paymentFormDate = await lastValueFrom(results$);

    let formData: any = paymentFormDate;

    let content = [
      {
        columns: [
          [
            { text: 'Payment ID: ' + formData.payment_code },
            { text: 'Payment Date: ' + formData.payment_date },
            { text: 'Order ID: ' + formData.order.order_code },
            { text: 'Customer Name: ' + formData.order.customer_name },
            { text: 'Amount Due: ' + formData.order.total_amount },
            { text: 'Amount Paid: ' + formData.amount_paid },
            { text: 'Balance: ' + (+formData.order.total_amount - +formData.amount_paid) },
          ],
          []
        ]
      },
    ];

    this.pdfPrint.printRoll(content);
  }
  
}
