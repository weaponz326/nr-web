import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { SuppliersApiService } from 'projects/shop/src/app/services/modules-api/suppliers-api/suppliers-api.service';
// import { SuppliersPrintService } from 'projects/shop/src/app/services/modules-printing/suppliers-print/suppliers-print.service';


@Component({
  selector: 'app-all-suppliers',
  templateUrl: './all-suppliers.component.html',
  styleUrls: ['./all-suppliers.component.scss']
})
export class AllSuppliersComponent implements OnInit {

  constructor(
    private router: Router,
    private suppliersApi: SuppliersApiService,
    // private suppliersPrint: SuppliersPrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Suppliers", url: "/home/suppliers/all-suppliers" },
  ];

  suppliersGridData: any[] = [];

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
    this.getAccountSupplier(1, 20, "-created_at");
  }

  getAccountSupplier(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.suppliersApi.getAccountSupplier(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.suppliersGridData = res.results;

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
    this.getAccountSupplier(1, 20, column);

    this.currentSortColumn = column;
  }

  viewSupplier(supplierId: any){
    console.log(supplierId);

    sessionStorage.setItem('shop_supplier_id', supplierId);
    this.router.navigateByUrl('/home/suppliers/view-supplier');
  }

  onPrint(){
    console.log("lets start printing...");
    // this.suppliersPrint.printAllSuppliers();
  }

}
