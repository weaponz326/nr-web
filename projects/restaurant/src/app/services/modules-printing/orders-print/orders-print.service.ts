import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
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

    var header = 'netRink Restaurant - ';
    this.pdfPrint.openPdf(header, content);
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
            { text: 'Order Status: ' + formData.order_status },
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

    var header = 'netRink Restaurant - All Menu Items';
    this.pdfPrint.openPdf(header, content);
  }

  // print roll

  async printOrderRoll(){
    const orderFormResults$ = this.ordersApi.getOrder();
    const orderItemsGridResults$ = this.ordersApi.getOrderItem();

    const orderFormData = await lastValueFrom(orderFormResults$);
    const orderItemsGridData = await lastValueFrom(orderItemsGridResults$);

    // order
    let formData: any = orderFormData;

    var orderBody = [];

    orderBody.push(['Order ID :',  formData.order_code]);
    orderBody.push(['Order Date :',  formatDate(formData.order_date, 'yyyy-MM-dd hh:mm:ss', 'en-US')]);
    orderBody.push(['Customer Name :',  formData.customer_name]);
    orderBody.push(['Order Type :',  formData.order_type]);
    orderBody.push(['Order Status :',  formData.order_status]);

    // items
    var itemsBody = [['No.', 'Menu Item', 'Item Price', 'Quantity', 'Total Price']];

    for (let data of orderItemsGridData){
      var row = [];
      let rowData: any = data;
      row.push(rowData.item_number);
      row.push(rowData.menu_item.item_name);
      row.push(rowData.menu_item.price);
      row.push(rowData.quantity);
      row.push(rowData.menu_item.price * rowData.quantity);

      itemsBody.push(row);
    }

    var totalAmount = 0;
    for (let data of orderItemsGridData){
      let rowData: any = data;
      totalAmount += rowData.menu_item.price * rowData.quantity;
    }

    itemsBody.push(['', '', '', '', totalAmount.toString()])

    let content = [
      {
        layout: 'noBorders',
        table: {
          headerRows: 1,
          widths: ['25%', '55%'],
          body: orderBody
        }
      },
      { text: 'Order Items', bold: true, margin: [0, 20, 0, 10] },
      {
        layout: 'noBorders',
        table: {
          headerRows: 1,
          widths: ['5%', '35%', '20%', '10%', '20%'],
          body: itemsBody
        }
      }
    ]

    this.pdfPrint.printRoll(content);
  }

}
