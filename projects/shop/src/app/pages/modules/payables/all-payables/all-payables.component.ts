import { Component, OnInit, ViewChild } from '@angular/core';

import { AddPayableComponent } from '../add-payable/add-payable.component'
import { EditPayableComponent } from '../edit-payable/edit-payable.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { PayablesApiService } from 'projects/shop/src/app/services/modules-api/payables-api/payables-api.service';
// import { PayablePrintService } from 'projects/shop/src/app/services/modules-printing/payable-print/payable-print.service';


@Component({
  selector: 'app-all-payables',
  templateUrl: './all-payables.component.html',
  styleUrls: ['./all-payables.component.scss']
})
export class AllPayablesComponent implements OnInit {

  constructor(
    private payablesApi: PayablesApiService,
    // private kitchenStockPrint: KitchenStockPrintService
  ) { }

  @ViewChild('addPayableComponentReference', { read: AddPayableComponent, static: false }) addPayable!: AddPayableComponent;
  @ViewChild('editPayableComponentReference', { read: EditPayableComponent, static: false }) editPayable!: EditPayableComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Items", url: "/home/kitchenStock/all-payables" },
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
    this.getAccountPayable(1, 20, "-created_at");
  }

  getAccountPayable(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.payablesApi.getAccountPayable(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.itemsGridData = res.results;

          this.currentPage = res.current_page;
          this.totalPages = res.total_pages;
          this.totalItems = res.count;

          this.isFetchingGridData = false;
          if(this.totalItems == 0)
            this.isDataAvailable = false
          else 
            this.isDataAvailable = true
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
    this.getAccountPayable(1, 20, column);

    this.currentSortColumn = column;
  }

  postPayable(data: any){
    console.log(data);
    this.addPayable.isItemSaving = true;

    this.payablesApi.postPayable(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            this.getAccountPayable(1, 20, '-created_at');
            this.addPayable.isItemSaving = false;
            this.addPayable.addButton.nativeElement.click();
            this.isDataAvailable = false;

            this.addPayable.resetForm();
          }
        },
        error: (err) => {
          console.log(err);
          this.addPayable.isItemSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  putPayable(item: any){
    console.log(item);
    this.editPayable.isItemSaving = true;

    this.payablesApi.putPayable(item.id, item.data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.editPayable.isItemSaving = false;
          this.editPayable.editButton.nativeElement.click();
          this.getAccountPayable(1, 20, '-created_at');
        },
        error: (err) => {
          console.log(err);
          this.addPayable.isItemSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  deletePayable(){
    this.editPayable.isItemDeleting = true;

    this.payablesApi.deletePayable(this.deleteId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.editPayable.isItemDeleting = false;
          this.getAccountPayable(1, 20, '-created_at');
        },
        error: (err) => {
          console.log(err);
          this.editPayable.isItemDeleting = false;
          this.connectionToast.openToast();
        }
      })
  }

  openEditItem(data: any){
    console.log(data);
    this.editPayable.openModal(data);
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

  onPrint(){
    console.log("lets start printing...");
    // this.kitchenStockPrint.printAllPayables();
  }

}
