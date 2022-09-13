import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { PdfPrintService } from 'projects/personal/src/app/services/module-utilities/pdf-print/pdf-print.service';
import { OrdersApiService } from 'projects/restaurant/src/app/services/modules-api/orders-api/orders-api.service';


@Injectable({
  providedIn: 'root'
})
export class OrdersPrintService {

  constructor(
    private pdfPrint: PdfPrintService,
    private ordersApi: OrdersApiService
  ) { }

  // all orders

  async printAllOrders(){
    const results$ = await this.ordersApi.getAccountOrder(1, 100, "");
    const ordersGridData = await lastValueFrom(results$);

    var body = [['Order ID', 'Order Date', 'Customer Name', 'Total Amount']];

    for (let data of ordersGridData.results){
      var row = [];
      let rowData: any = data;
      row.push(rowData.order_code);
      row.push(rowData.order_date);
      row.push(rowData.customer_name);
      row.push(rowData.order_total);
      body.push(row);
    }

    let content = [
      {
        header: 'netRink Restaurant - All Orders',
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['20%', '25%', '35%' , '20%'],
          body: body
        }
      }
    ]

    this.pdfPrint.openPdf(content);
  }

  // view order

  async printViewOrder(){
    const orderFormResults$ = this.ordersApi.getOrder();
    const orderItemsGridResults$ = this.ordersApi.getOrderItem();

    const orderFormData = await lastValueFrom(orderFormResults$);
    const orderItemsGridData = await lastValueFrom(orderItemsGridResults$);

    let formData: any = orderFormData;

    var body = [['Menu Item', 'Item Price', 'Quantity', 'Total Price']];

    for (let data of orderItemsGridData){
      var row = [];
      let rowData: any = data;
      row.push(rowData.menu_item.item_name);
      row.push(rowData.menu_item.price);
      row.push(rowData.quantity);
      row.push(rowData.menu_item.price * rowData.quantity);
      body.push(row);
    }

    var totalAmount = 0;
    for (let data of orderItemsGridData){
      let rowData: any = data;
      totalAmount += rowData.menu_item.price * rowData.quantity;
    }

    body.push(['', '', '', totalAmount.toString()])

    let content = [
      {
        columns: [
          [
            { text: 'Order ID: ' + formData.order_code },
            { text: 'Order Date: ' + formData.order_date },
            { text: 'Customer Name: ' + formData.customer_name },
          ],
          [
            { text: 'Order Type: ' + formData.order_type },
            { text: 'Order Status: ' + formData.order_tatus },
          ]
        ]
      },
      { text: 'Order Items', bold: true, margin: [0, 20, 0, 10] },
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['35%', '20%', '15%', '20%'],
          body: body
        }
      }
    ]

    this.pdfPrint.openPdf(content);
  }

  // print roll

  async printOrderRoll(){
    const orderFormResults$ = this.ordersApi.getOrder();
    const orderItemsGridResults$ = this.ordersApi.getOrderItem();

    const orderFormData = await lastValueFrom(orderFormResults$);
    const orderItemsGridData = await lastValueFrom(orderItemsGridResults$);

    let formData: any = orderFormData;

    var body = [['Menu Item', 'Item Price', 'Quantity', 'Total Price']];

    for (let data of orderItemsGridData){
      var row = [];
      let rowData: any = data;
      row.push(rowData.menu_item.item_name);
      row.push(rowData.menu_item.price);
      row.push(rowData.quantity);
      row.push(rowData.menu_item.price * rowData.quantity);

      body.push(row);
    }

    var totalAmount = 0;
    for (let data of orderItemsGridData){
      let rowData: any = data;
      totalAmount += rowData.menu_item.price * rowData.quantity;
    }

    body.push(['', '', '', totalAmount.toString()])

    let content = [
      {
        columns: [
          [
            { text: 'Order ID: ' + formData.order_code },
            { text: 'Order Date: ' + formData.order_date },
            { text: 'Customer Name: ' + formData.customer.customer_name },
            { text: 'Order Type: ' + formData.order_type },
            { text: 'Order Status: ' + formData.order_tatus },
          ]
        ]
      },
      { text: 'Order Items', bold: true, margin: [0, 20, 0, 10] },
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['35%', '20%', '15%', '20%'],
          body: body
        }
      }
    ]

    this.pdfPrint.printRoll(content);
  }

}
