import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
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
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['15%', '20%', '20%', '15%', '30%'],
          body: body
        }
      }
    ]

    var header = 'netRink Restaurant - All Payments';
    this.pdfPrint.openPdf(header, content);
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

    var header = 'netRink Restaurant - View Payment';
    this.pdfPrint.openPdf(header, content);
  }

  async printPaymentRoll(){
    const results$ = this.paymentsApi.getPayment();
    const paymentForm = await lastValueFrom(results$);

    let formData: any = paymentForm;

    var body = [];

    body.push(['Payment ID :', formData.payment_code]);
    body.push(['Payment Date :', formatDate(formData.payment_date, 'yyyy-MM-dd hh:mm:ss', 'en-US')]);
    body.push(['Order ID :', formData.order.order_code]);
    body.push(['Customer Name :', formData.order.customer_name]);
    body.push(['Amount Due :', formData.order.order_total]);
    body.push(['Amount Paid :', formData.amount_paid]);
    body.push(['Balance :', Number(formData.order.order_total) - Number(formData.amount_paid)]);

    let content = [
      {
        header: 'netRink Restaurant - Payment',
        layout: 'noBorders',
        table: {
          headerRows: 1,
          widths: ['30%', '70%'],
          body: body
        }
      }    
    ];

    this.pdfPrint.printRoll(content);
  }
  
}
