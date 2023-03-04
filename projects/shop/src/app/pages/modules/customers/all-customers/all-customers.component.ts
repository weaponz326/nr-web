import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomersApiService } from 'projects/shop/src/app/services/modules-api/customers-api/customers-api.service';
// import { CustomersPrintService } from 'projects/shop/src/app/services/modules-printing/customers-print/customers-print.service';


@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.scss']
})
export class AllCustomersComponent implements OnInit {

  constructor(
    private router: Router,
    private customersApi: CustomersApiService,
    // private customersPrint: CustomersPrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Customers", url: "/home/customers/all-customers" },
  ];

  customersGridData: any[] = [];

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
    this.getAccountCustomer(1, 20, "-created_at");
  }

  getAccountCustomer(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.customersApi.getAccountCustomer(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.customersGridData = res.results;

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
    this.getAccountCustomer(1, 20, column);

    this.currentSortColumn = column;
  }

  viewCustomer(customerId: any){
    console.log(customerId);

    sessionStorage.setItem('shop_customer_id', customerId);
    this.router.navigateByUrl('/home/customers/view-customer');
  }

  onPrint(){
    console.log("lets start printing...");
    // this.customersPrint.printAllCustomers();
  }

}
