import { Component, OnInit, ViewChild } from '@angular/core';

import { AddItemComponent } from '../add-item/add-item.component'
import { EditItemComponent } from '../edit-item/edit-item.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component'

import { ServicesApiService } from 'projects/hotel/src/app/services/modules-api/services-api/services-api.service';


@Component({
  selector: 'app-service-items',
  templateUrl: './service-items.component.html',
  styleUrls: ['./service-items.component.scss']
})
export class ServiceItemsComponent implements OnInit {

  constructor(
    private servicesApi: ServicesApiService
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
    this.getServiceItem();
  }

  getServiceItem(){
    this.isFetchingGridData = true;

    this.servicesApi.getServiceItem()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.itemsGridData = res;
          this.calculateTotalAmount();

          try { this.lastItem = Number((res[res.length - 1]).item_number) }
          catch{ this.lastItem = 0 }

          this.isFetchingGridData = false;
        },
        error: (err) => {
          console.log(err);
          this.isFetchingGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  calculateTotalAmount(){
    this.totalAmount = 0;
    for (let item of this.itemsGridData){
      console.log(item.amount);
      this.totalAmount += item.amount;
    }

    this.patchTotalAmount();
    console.log(this.totalAmount);
  }

  postItem(data: any){
    console.log(data);
    this.addItem.isItemSaving = true;

    this.servicesApi.postItem(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            this.getServiceItem();

            this.addItem.isItemSaving = false;
            this.addItem.dismissButton.nativeElement.click();
            this.addItem.resetForm();
          }
        },
        error: (err) => {
          console.log(err);
          this.addItem.isItemSaving = false;
          this.addItem.dismissButton.nativeElement.click();
          this.connectionToast.openToast();
        }
      })
  }

  putItem(service_item: any){
    console.log(service_item);
    this.editItem.isItemSaving = true;

    this.servicesApi.putItem(service_item.id, service_item.data)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.editItem.isItemSaving = false;
          this.editItem.dismissButton.nativeElement.click();
          this.getServiceItem();
        },
        error: (err) => {
          console.log(err);
          this.editItem.isItemSaving = false;
          this.editItem.dismissButton.nativeElement.click();
          this.connectionToast.openToast();
        }
      })
  }

  deleteItem(){
    this.isItemDeleting = true;

    this.servicesApi.deleteItem(this.deleteId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isItemDeleting = false;
          this.getServiceItem();
        },
        error: (err) => {
          console.log(err);
          this.isItemDeleting = false;
          this.connectionToast.openToast();
        }
      })
  }

  patchTotalAmount(){
    let data = { service_total: this.totalAmount }

    this.servicesApi.putService(data)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
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
