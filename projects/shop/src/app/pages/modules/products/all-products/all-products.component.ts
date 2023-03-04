import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { ProductsApiService } from 'projects/shop/src/app/services/modules-api/products-api/products-api.service';
// import { ProductsPrintService } from 'projects/shop/src/app/services/modules-printing/products-print/products-print.service';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  constructor(
    private router: Router,
    private productsApi: ProductsApiService,
    // private productsPrint: ProductsPrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Products", url: "/home/products/all-products" },
  ];

  productsGridData: any[] = [];

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
    this.getAccountProduct(1, 20, "-created_at");
  }

  getAccountProduct(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.productsApi.getAccountProduct(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.productsGridData = res.results;

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
    this.getAccountProduct(1, 20, column);

    this.currentSortColumn = column;
  }

  viewProduct(productId: any){
    console.log(productId);

    sessionStorage.setItem('shop_product_id', productId);
    this.router.navigateByUrl('/home/products/view-product');
  }

  onPrint(){
    console.log("lets start printing...");
    // this.productsPrint.printAllProducts();
  }

}
