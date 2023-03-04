import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

// import { PaymentsApiService } from 'projects/shop/src/app/services/modules-api/payments-api/payments-api.service';
// import { PaymentsPrintService } from 'projects/shop/src/app/services/modules-printing/payments-print/payments-print.service';


@Component({
  selector: 'app-all-payments',
  templateUrl: './all-payments.component.html',
  styleUrls: ['./all-payments.component.scss']
})
export class AllPaymentsComponent implements OnInit {

  constructor(
    private router: Router,
    // private paymentsApi: PaymentsApiService,
    // private paymentsPrint: PaymentsPrintService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Payments", url: "/home/payments/all-payments" },
  ];

  paymentsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountPayment(1, 20, "-created_at");
  }

  getAccountPayment(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    // this.paymentsApi.getAccountPayment(page, size, sortField)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.paymentsGridData = res.results;

    //       this.currentPage = res.current_page;
    //       this.totalPages = res.total_pages;
    //       this.totalItems = res.count;

    //       this.isFetchingGridData = false;
    //       if(this.totalItems == 0)
    //         this.isDataAvailable = false
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isFetchingGridData = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  sortTable(column: any){
    console.log(column);
    this.getAccountPayment(1, 20, column);

    this.currentSortColumn = column;
  }

  viewPayment(paymentId: any){
    console.log(paymentId);

    sessionStorage.setItem("shop_payment_id", paymentId);
    this.router.navigateByUrl("/home/payments/view-payment");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.paymentsPrint.printAllPayments();
  }

}
