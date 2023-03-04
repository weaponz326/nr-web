import { Component, OnInit, ViewChild } from '@angular/core';

import { AddInventoryComponent } from '../add-inventory/add-inventory.component'
import { EditInventoryComponent } from '../edit-inventory/edit-inventory.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { InventoryApiService } from 'projects/shop/src/app/services/modules-api/inventory-api/inventory-api.service';
// import { InventoryPrintService } from 'projects/shop/src/app/services/modules-printing/inventory-print/inventory-print.service';


@Component({
  selector: 'app-all-inventory',
  templateUrl: './all-inventory.component.html',
  styleUrls: ['./all-inventory.component.scss']
})
export class AllInventoryComponent implements OnInit {

  constructor(
    private inventoryApi: InventoryApiService,
    // private kitchenStockPrint: KitchenStockPrintService
  ) { }

  @ViewChild('addInventoryComponentReference', { read: AddInventoryComponent, static: false }) addInventory!: AddInventoryComponent;
  @ViewChild('editInventoryComponentReference', { read: EditInventoryComponent, static: false }) editInventory!: EditInventoryComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Items", url: "/home/kitchenStock/all-inventory" },
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
    this.getAccountInventory(1, 20, "-created_at");
  }

  getAccountInventory(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.inventoryApi.getAccountInventory(page, size, sortField)
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
    this.getAccountInventory(1, 20, column);

    this.currentSortColumn = column;
  }

  postInventory(data: any){
    console.log(data);
    this.addInventory.isItemSaving = true;

    this.inventoryApi.postInventory(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            this.getAccountInventory(1, 20, '-created_at');
            this.addInventory.isItemSaving = false;
            this.addInventory.addButton.nativeElement.click();
            this.isDataAvailable = false;

            this.addInventory.resetForm();
          }
        },
        error: (err) => {
          console.log(err);
          this.addInventory.isItemSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  putInventory(item: any){
    console.log(item);
    this.editInventory.isItemSaving = true;

    this.inventoryApi.putInventory(item.id, item.data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.editInventory.isItemSaving = false;
          this.editInventory.editButton.nativeElement.click();
          this.getAccountInventory(1, 20, '-created_at');
        },
        error: (err) => {
          console.log(err);
          this.addInventory.isItemSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  deleteInventory(){
    this.editInventory.isItemDeleting = true;

    this.inventoryApi.deleteInventory(this.deleteId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.editInventory.isItemDeleting = false;
          this.getAccountInventory(1, 20, '-created_at');
        },
        error: (err) => {
          console.log(err);
          this.editInventory.isItemDeleting = false;
          this.connectionToast.openToast();
        }
      })
  }

  openEditItem(data: any){
    console.log(data);
    this.editInventory.openModal(data);
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

  onPrint(){
    console.log("lets start printing...");
    // this.kitchenStockPrint.printAllInventory();
  }

}
