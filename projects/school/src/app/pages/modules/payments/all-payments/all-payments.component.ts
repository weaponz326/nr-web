import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';

// import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';
import { PaymentsApiService } from 'projects/school/src/app/services/modules-api/payments-api/payments-api.service';
// import { PaymentsPrintService } from 'projects/school/src/app/services/printing/payments-print/payments-print.service';
@Component({
  selector: 'app-all-payments',
  templateUrl: './all-payments.component.html',
  styleUrls: ['./all-payments.component.scss']
})
export class AllPaymentsComponent implements OnInit {

  constructor(
    private router: Router,
    // private activeTerm: ActiveTermService,
    private paymentsApi: PaymentsApiService,
    // private paymentsPrint: PaymentsPrintService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;

  navHeading: any[] = [
    { text: "All Payments", url: "/home/payments/all-payments" },
  ];

  activeTermName: any;

  paymentsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getActiveTerm();
    this.getAccountPayment(1, 20, "-created_at");
  }

  getActiveTerm(){
    // this.activeTermName = this.activeTerm.getActiveTerm().data.term_name;
  }

  getAccountPayment(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.paymentsApi.getAccountPayment(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.paymentsGridData = res.results;

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
    this.getAccountPayment(1, 20, column);

    this.currentSortColumn = column;
  }

  viewPayment(paymentId: any){
    console.log(paymentId);

    sessionStorage.setItem("school_payment_id", paymentId);
    this.router.navigateByUrl("/home/payments/view-payment");
  }

  openTermWindow(){
    console.log("You are opening select term window")
    // this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    // this.activeTerm.setActiveTerm(termData);
    this.getActiveTerm();
    this.getAccountPayment(1, 20, "-created_at");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.paymentsPrint.printAllPayments();
  }

}
