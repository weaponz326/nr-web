import { Component, OnInit, ViewChild } from '@angular/core';

import { AddItemComponent } from '../add-item/add-item.component'
import { EditItemComponent } from '../edit-item/edit-item.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component'

import { PrescriptionsApiService } from 'projects/hospital/src/app/services/modules-api/prescriptions-api/prescriptions-api.service';


@Component({
  selector: 'app-prescription-items',
  templateUrl: './prescription-items.component.html',
  styleUrls: ['./prescription-items.component.scss']
})
export class PrescriptionItemsComponent implements OnInit {

  constructor(
    private prescriptionsApi: PrescriptionsApiService
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
    this.getPrescriptionItem();
  }

  getPrescriptionItem(){
    this.isFetchingGridData = true;

    this.prescriptionsApi.getPrescriptionItem()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.itemsGridData = res;

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

  postItem(data: any){
    console.log(data);
    this.addItem.isItemSaving = true;

    this.prescriptionsApi.postItem(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            this.getPrescriptionItem();

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

  putItem(prescription_item: any){
    console.log(prescription_item);
    this.editItem.isItemSaving = true;

    this.prescriptionsApi.putItem(prescription_item.id, prescription_item.data)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.editItem.isItemSaving = false;
          this.editItem.dismissButton.nativeElement.click();
          this.getPrescriptionItem();
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

    this.prescriptionsApi.deleteItem(this.deleteId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isItemDeleting = false;
          this.getPrescriptionItem();
        },
        error: (err) => {
          console.log(err);
          this.isItemDeleting = false;
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
