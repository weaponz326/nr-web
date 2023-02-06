import { Component, OnInit, ViewChild } from '@angular/core';

import { AddItemComponent } from '../add-item/add-item.component'
import { EditItemComponent } from '../edit-item/edit-item.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component'

// import { DispensaryApiService } from 'projects/hospital/src/app/services/modules-api/dispensary-api/dispensary-api.service';


@Component({
  selector: 'app-dispense-items',
  templateUrl: './dispense-items.component.html',
  styleUrls: ['./dispense-items.component.scss']
})
export class DispenseItemsComponent implements OnInit {

  constructor(
    // private dispensaryApi: DispensaryApiService
  ) { }

  @ViewChild('addItemComponentReference', { read: AddItemComponent, static: false }) addItem!: AddItemComponent;
  @ViewChild('editItemComponentReference', { read: EditItemComponent, static: false }) editItem!: EditItemComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;

  itemsGridData: any[] = [];

  totalAmount = 0;
  lastItem = 0;

  deleteId = "";
  isItemDeleting = false;

  isFetchingGridData = false;

  ngOnInit(): void {
    this.getOrderItem();
  }

  getOrderItem(){
    this.isFetchingGridData = true;

    // this.dispensaryApi.getOrderItem()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.itemsGridData = res;

    //       try { this.lastItem = Number((res[res.length - 1]).item_number) }
    //       catch{ this.lastItem = 0 }

    //       this.isFetchingGridData = false;
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isFetchingGridData = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  postItem(data: any){
    console.log(data);
    this.addItem.isItemSaving = true;

    // this.dispensaryApi.postItem(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       if(res.id){
    //         this.getOrderItem();

    //         this.addItem.isItemSaving = false;
    //         this.addItem.dismissButton.nativeElement.click();
    //         this.addItem.resetForm();
    //       }
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.addItem.isItemSaving = false;
    //       this.addItem.dismissButton.nativeElement.click();
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  putItem(order_item: any){
    console.log(order_item);
    this.editItem.isItemSaving = true;

    // this.dispensaryApi.putItem(order_item.id, order_item.data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       this.editItem.isItemSaving = false;
    //       this.editItem.dismissButton.nativeElement.click();
    //       this.getOrderItem();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.editItem.isItemSaving = false;
    //       this.editItem.dismissButton.nativeElement.click();
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  deleteItem(){
    this.isItemDeleting = true;

    // this.dispensaryApi.deleteItem(this.deleteId)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.isItemDeleting = false;
    //       this.getOrderItem();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isItemDeleting = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  openEditItem(data: any){
    console.log(data);
    this.editItem.openModal(data);
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

}
