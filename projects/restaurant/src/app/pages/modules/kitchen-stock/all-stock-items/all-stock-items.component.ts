import { Component, OnInit, ViewChild } from '@angular/core';

import { AddStockItemComponent } from '../add-stock-item/add-stock-item.component'
import { EditStockItemComponent } from '../edit-stock-item/edit-stock-item.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { KitchenStockApiService } from 'projects/restaurant/src/app/services/modules-api/kitchen-stock-api/kitchen-stock-api.service';
// import { KitchenStockPrintService } from 'projects/restaurant/src/app/services/printing/kitchen-stock-print/kitchen-stock-print.service';


@Component({
  selector: 'app-all-stock-items',
  templateUrl: './all-stock-items.component.html',
  styleUrls: ['./all-stock-items.component.scss']
})
export class AllStockItemsComponent implements OnInit {

  constructor(
    private kitchenStockApi: KitchenStockApiService,
    // private kitchenStockPrint: KitchenStockPrintService
  ) { }

  @ViewChild('addStockItemComponentReference', { read: AddStockItemComponent, static: false }) addStockItem!: AddStockItemComponent;
  @ViewChild('editStockItemComponentReference', { read: EditStockItemComponent, static: false }) editStockItem!: EditStockItemComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Items", url: "/home/kitchenStock/all-stock-items" },
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
    this.getAccountStockItem(1, 20, "-created_at");
  }

  getAccountStockItem(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.kitchenStockApi.getAccountStockItem(page, size, sortField)
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
    this.getAccountStockItem(1, 20, column);

    this.currentSortColumn = column;
  }

  postStockItem(data: any){
    console.log(data);
    this.addStockItem.isItemSaving = true;

    this.kitchenStockApi.postStockItem(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            this.getAccountStockItem(1, 20, '-created_at');
            this.addStockItem.isItemSaving = false;
            this.addStockItem.addButton.nativeElement.click();
            this.isDataAvailable = false;

            this.addStockItem.resetForm();
          }
        },
        error: (err) => {
          console.log(err);
          this.addStockItem.isItemSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  putStockItem(item: any){
    console.log(item);
    this.editStockItem.isItemSaving = true;

    this.kitchenStockApi.putStockItem(item.id, item.data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.editStockItem.isItemSaving = false;
          this.editStockItem.editButton.nativeElement.click();
          this.getAccountStockItem(1, 20, '-created_at');
        },
        error: (err) => {
          console.log(err);
          this.addStockItem.isItemSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  deleteStockItem(){
    this.editStockItem.isItemDeleting = true;

    this.kitchenStockApi.deleteStockItem(this.deleteId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.editStockItem.isItemDeleting = false;
          this.editStockItem.editButton.nativeElement.click();
          this.getAccountStockItem(1, 20, '-created_at');
        },
        error: (err) => {
          console.log(err);
          this.editStockItem.isItemDeleting = false;
          this.connectionToast.openToast();
        }
      })
  }

  openEditItem(data: any){
    console.log(data);
    this.editStockItem.openModal(data);
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

  onPrint(){
    console.log("lets start printing...");
    // this.kitchenStockPrint.printAllStockItems();
  }

}
