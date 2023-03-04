import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NewPurchasingComponent } from '../new-purchasing/new-purchasing.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { PurchasingApiService } from 'projects/shop/src/app/services/modules-api/purchasing-api/purchasing-api.service';
// import { PurchasingPrintService } from 'projects/shop/src/app/services/modules-printing/purchasing-print/purchasing-print.service';


@Component({
  selector: 'app-all-purchasing',
  templateUrl: './all-purchasing.component.html',
  styleUrls: ['./all-purchasing.component.scss']
})
export class AllPurchasingComponent implements OnInit {

  constructor(
    private router: Router,
    private purchasingApi: PurchasingApiService,
    // private purchasingPrint: PurchasingPrintService
  ) { }

  @ViewChild('newPurchasingComponentReference', { read: NewPurchasingComponent, static: false }) newPurchasing!: NewPurchasingComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Purchasing", url: "/home/purchasing/all-purchasing" },
  ];

  purchasingGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountPurchasing(1, 20, "-created_at");
  }

  getAccountPurchasing(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.purchasingApi.getAccountPurchasing(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.purchasingGridData = res.results;

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
    this.getAccountPurchasing(1, 20, column);

    this.currentSortColumn = column;
  }

  viewPurchasing(purchasingId: any){
    console.log(purchasingId);

    sessionStorage.setItem("shop_purchasing_id", purchasingId);
    this.router.navigateByUrl("/home/purchasing/view-purchasing");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.purchasingPrint.printAllPurchasing()
  }

}
