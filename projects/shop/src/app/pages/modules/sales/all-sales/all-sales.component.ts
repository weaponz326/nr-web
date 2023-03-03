import { Component, OnInit, ViewChild } from '@angular/core';

import { AddSalesComponent } from '../add-sales/add-sales.component'
import { EditSalesComponent } from '../edit-sales/edit-sales.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

// import { SalesApiService } from 'projects/shop/src/app/services/modules-api/kitchen-stock-api/kitchen-stock-api.service';
// import { SalesPrintService } from 'projects/shop/src/app/services/modules-printing/sales-print/sales-print.service';


@Component({
  selector: 'app-all-sales',
  templateUrl: './all-sales.component.html',
  styleUrls: ['./all-sales.component.scss']
})
export class AllSalesComponent implements OnInit {

  constructor(
    // private salesApi: SalesApiService,
    // private kitchenStockPrint: KitchenStockPrintService
  ) { }

  @ViewChild('addSalesComponentReference', { read: AddSalesComponent, static: false }) addSales!: AddSalesComponent;
  @ViewChild('editSalesComponentReference', { read: EditSalesComponent, static: false }) editSales!: EditSalesComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Items", url: "/home/kitchenStock/all-sales" },
  ];

  itemsGridData: any[] = [];

  deleteId = "";

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountSales(1, 20, "-created_at");
  }

  getAccountSales(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    // this.salesApi.getAccountSales(page, size, sortField)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.itemsGridData = res.results;

    //       this.currentPage = res.current_page;
    //       this.totalPages = res.total_pages;
    //       this.totalItems = res.count;

    //       this.isFetchingGridData = false;
    //       if(this.totalItems == 0)
    //         this.isDataAvailable = false
    //       else 
    //         this.isDataAvailable = true
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
    this.getAccountSales(1, 20, column);

    this.currentSortColumn = column;
  }

  postSales(data: any){
    console.log(data);
    this.addSales.isItemSaving = true;

    // this.salesApi.postSales(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       if(res.id){
    //         this.getAccountSales(1, 20, '-created_at');
    //         this.addSales.isItemSaving = false;
    //         this.addSales.addButton.nativeElement.click();
    //         this.isDataAvailable = false;

    //         this.addSales.resetForm();
    //       }
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.addSales.isItemSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  putSales(item: any){
    console.log(item);
    this.editSales.isItemSaving = true;

    // this.salesApi.putSales(item.id, item.data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.editSales.isItemSaving = false;
    //       this.editSales.editButton.nativeElement.click();
    //       this.getAccountSales(1, 20, '-created_at');
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.addSales.isItemSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  deleteSales(){
    this.editSales.isItemDeleting = true;

    // this.salesApi.deleteSales(this.deleteId)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.editSales.isItemDeleting = false;
    //       this.getAccountSales(1, 20, '-created_at');
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.editSales.isItemDeleting = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  openEditItem(data: any){
    console.log(data);
    this.editSales.openModal(data);
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

  onPrint(){
    console.log("lets start printing...");
    // this.kitchenStockPrint.printAllSales();
  }

}
