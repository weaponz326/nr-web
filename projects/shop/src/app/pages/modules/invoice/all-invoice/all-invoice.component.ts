import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NewInvoiceComponent } from '../new-invoice/new-invoice.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { InvoiceApiService } from 'projects/shop/src/app/services/modules-api/invoice-api/invoice-api.service';
// import { InvoicePrintService } from 'projects/shop/src/app/services/modules-printing/invoice-print/invoice-print.service';


@Component({
  selector: 'app-all-invoice',
  templateUrl: './all-invoice.component.html',
  styleUrls: ['./all-invoice.component.scss']
})
export class AllInvoiceComponent implements OnInit {

  constructor(
    private router: Router,
    private invoiceApi: InvoiceApiService,
    // private invoicePrint: InvoicePrintService
  ) { }

  @ViewChild('newInvoiceComponentReference', { read: NewInvoiceComponent, static: false }) newInvoice!: NewInvoiceComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Invoice", url: "/home/invoice/all-invoice" },
  ];

  invoiceGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountInvoice(1, 20, "-created_at");
  }

  getAccountInvoice(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.invoiceApi.getAccountInvoice(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.invoiceGridData = res.results;

          this.currentPage = res.current_page;
          this.totalPages = res.total_pages;
          this.totalItems = res.count;

          this.isFetchingGridData = false;
          if(this.totalItems == 0)
            this.isDataAvailable = false
        },
        error: (err) => {
          console.log(err);
          this.isFetchingGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  sortTable(column: any){
    console.log(column);
    this.getAccountInvoice(1, 20, column);

    this.currentSortColumn = column;
  }

  viewInvoice(invoiceId: any){
    console.log(invoiceId);

    sessionStorage.setItem("shop_invoice_id", invoiceId);
    this.router.navigateByUrl("/home/invoice/view-invoice");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.invoicePrint.printAllInvoice()
  }

}
