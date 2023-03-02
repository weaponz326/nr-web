import { Component, OnInit, ViewChild } from '@angular/core';

import { AddReceivableComponent } from '../add-receivable/add-receivable.component'
import { EditReceivableComponent } from '../edit-receivable/edit-receivable.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

// import { ReceivablesApiService } from 'projects/shop/src/app/services/modules-api/kitchen-stock-api/kitchen-stock-api.service';
// import { ReceivablePrintService } from 'projects/shop/src/app/services/modules-printing/receivable-print/receivable-print.service';


@Component({
  selector: 'app-all-receivables',
  templateUrl: './all-receivables.component.html',
  styleUrls: ['./all-receivables.component.scss']
})
export class AllReceivablesComponent implements OnInit {

  constructor(
    // private receivablesApi: ReceivablesApiService,
    // private kitchenStockPrint: KitchenStockPrintService
  ) { }

  @ViewChild('addReceivableComponentReference', { read: AddReceivableComponent, static: false }) addReceivable!: AddReceivableComponent;
  @ViewChild('editReceivableComponentReference', { read: EditReceivableComponent, static: false }) editReceivable!: EditReceivableComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Items", url: "/home/kitchenStock/all-receivables" },
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
    this.getAccountReceivable(1, 20, "-created_at");
  }

  getAccountReceivable(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    // this.receivablesApi.getAccountReceivable(page, size, sortField)
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
    this.getAccountReceivable(1, 20, column);

    this.currentSortColumn = column;
  }

  postReceivable(data: any){
    console.log(data);
    this.addReceivable.isItemSaving = true;

    // this.receivablesApi.postReceivable(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       if(res.id){
    //         this.getAccountReceivable(1, 20, '-created_at');
    //         this.addReceivable.isItemSaving = false;
    //         this.addReceivable.addButton.nativeElement.click();
    //         this.isDataAvailable = false;

    //         this.addReceivable.resetForm();
    //       }
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.addReceivable.isItemSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  putReceivable(item: any){
    console.log(item);
    this.editReceivable.isItemSaving = true;

    // this.receivablesApi.putReceivable(item.id, item.data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.editReceivable.isItemSaving = false;
    //       this.editReceivable.editButton.nativeElement.click();
    //       this.getAccountReceivable(1, 20, '-created_at');
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.addReceivable.isItemSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  deleteReceivable(){
    this.editReceivable.isItemDeleting = true;

    // this.receivablesApi.deleteReceivable(this.deleteId)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.editReceivable.isItemDeleting = false;
    //       this.getAccountReceivable(1, 20, '-created_at');
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.editReceivable.isItemDeleting = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  openEditItem(data: any){
    console.log(data);
    this.editReceivable.openModal(data);
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

  onPrint(){
    console.log("lets start printing...");
    // this.kitchenStockPrint.printAllReceivables();
  }

}
