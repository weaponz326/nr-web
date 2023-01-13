import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { NewBillComponent } from '../new-bill/new-bill.component';

// import { BillsApiService } from 'projects/hotel/src/app/services/modules-api/bills-api/bills-api.service';
// import { BillsPrintService } from 'projects/hotel/src/app/services/modules-printing/bills-print/bills-print.service';


@Component({
  selector: 'app-all-bills',
  templateUrl: './all-bills.component.html',
  styleUrls: ['./all-bills.component.scss']
})
export class AllBillsComponent implements OnInit {

  constructor(
    private router: Router,
    // private billsApi: BillsApiService,
    // private billsPrint: BillsPrintService,
  ) { }

  @ViewChild('newBillComponentReference', { read: NewBillComponent, static: false }) newBill!: NewBillComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Bills", url: "/home/bills/all-bills" },
  ];

  billsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  sortParams = {
    field: "created_at",
    direction: "desc"
  }

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountBill(1, 20, "-created_at");
  }

  getAccountBill(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    // this.billsApi.getAccountBill(page, size, sortField)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.billsGridData = res.results;

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
    this.getAccountBill(1, 20, column);

    this.currentSortColumn = column;
  }

  viewBill(billId: any){
    console.log(billId);

    sessionStorage.setItem('hotel_bill_id', billId);
    this.router.navigateByUrl('/home/bills/view-bill');
  }

  onPrint(){
    console.log("lets start printing...");
    // this.billsPrint.printAllBills();
  }

}
