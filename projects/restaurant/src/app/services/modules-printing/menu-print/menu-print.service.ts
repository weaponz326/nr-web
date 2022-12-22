import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { PdfPrintService } from 'projects/personal/src/app/services/module-utilities/pdf-print/pdf-print.service';
import { MenuApiService } from 'projects/restaurant/src/app/services/modules-api/menu-api/menu-api.service';


@Injectable({
  providedIn: 'root'
})
export class MenuPrintService {

  constructor(
    private pdfPrint: PdfPrintService,
    private menuApi: MenuApiService
  ) { }

  // all menu group

  async printAllMenuGroup(){
    const results$ = await this.menuApi.getAccountMenuGroup(1, 100, "");
    const menuGroupGridData: any = await lastValueFrom(results$);

    var body = [['Menu Group', 'Category']];

    for (let data of menuGroupGridData.results){
      var row = [];
      let rowData: any = data;
      row.push(rowData.menu_group);
      row.push(rowData.category);
      body.push(row);
    }

    let content = [
      {
        header: 'netRink Restaurant - All Menu Groups',
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['60%', '40%'],
          body: body
        }
      }
    ]

    var header = 'netRink Restaurant - All Menu Group';
    this.pdfPrint.openPdf(header, content);
  }

  // view menu group

  async printViewMenuGroup(){
    const menuGroupFormResults$ = this.menuApi.getMenuGroup();
    const menuItemsGridResults$ = this.menuApi.getMenuGroupMenuItem();

    const menuGroupFormData = await lastValueFrom(menuGroupFormResults$);
    const menuItemsGridData = await lastValueFrom(menuItemsGridResults$);

    let formData: any = menuGroupFormData;

    var body = [['Item ID', 'Item Name', 'Price']];

    for (let data of menuItemsGridData){
      var row = [];
      let rowData: any = data;
      row.push(rowData.item_code);
      row.push(rowData.item_name);
      row.push(rowData.price);

      body.push(row);
    }

    let content = [
      {
        header: 'netRink Restaurant - View Menu Group',
        columns: [
          [
            { text: 'Menu Group: ' + formData.menu_group },
            { text: 'Category: ' + formData.category },
          ],
          []
        ]
      },
      { text: 'Menu Items', bold: true, margin: [0, 20, 0, 10] },
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['25%', '50%', '25%'],
          body: body
        }
      }
    ]

    var header = 'netRink Restaurant - View Menu Group';
    this.pdfPrint.openPdf(header, content);
  }

  async printAllMenuItems(){
    const results$ = this.menuApi.getAccountMenuItem(1, 100, "");
    const menuItemsGridData = await lastValueFrom(results$);

    var body = [['Item ID', 'Item Name', 'Price', 'Menu Group', 'Category']];

    for (let data of menuItemsGridData.results){
      var row = [];
      let rowData: any = data;
      row.push(rowData.item_code);
      row.push(rowData.item_name);
      row.push(rowData.price);
      row.push(rowData.menu_group.menu_group);
      row.push(rowData.menu_group.category);
      body.push(row);
    }

    let content = [
      {
        header: 'netRink Restaurant - All Menu Items',
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['15%', '30%', '15%', '20%', '20%'],
          body: body
        }
      }
    ]

    var header = 'netRink Restaurant - All Menu Items';
    this.pdfPrint.openPdf(header, content);
  }

}
