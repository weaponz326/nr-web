import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component';

import { AddItemComponent } from '../add-item/add-item.component';
import { EditItemComponent } from '../edit-item/edit-item.component';


@Component({
  selector: 'app-ledger-table',
  templateUrl: './ledger-table.component.html',
  styleUrls: ['./ledger-table.component.scss']
})
export class LedgerTableComponent implements OnInit {

  constructor(
    // private ledgersApi: LedgersApiService
  ) { }

  @Output() balanceEvent = new EventEmitter<any>();

  @ViewChild('addItemComponentReference', { read: AddItemComponent, static: false }) addItem!: AddItemComponent;
  @ViewChild('editItemComponentReference', { read: EditItemComponent, static: false }) editItem!: EditItemComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;

  itemsGridData: any[] = [];

  deleteId = "";
  balance = 0;

  isFetchingGridData = false;
  isItemDeleting = false;

  ngOnInit(): void {
    this.getLedgerItem();
  }

  calculateBalance(){
    this.balance = 0;
    for (let item of this.itemsGridData){
      if (item.item_type == "Credit")
        this.balance += +item.amount;
      else
        this.balance -= +item.amount;
    }

    this.balanceEvent.emit(this.balance);
    console.log(this.balance);
  }

  getLedgerItem(){
    this.isFetchingGridData = true;

    // this.ledgersApi.getLedgerItems()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       this.itemsGridData = res;
    //       this.isFetchingGridData = false;
    //       this.calculateBalance();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isFetchingGridData = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  createItem(data: any){
    console.log(data);
    this.addItem.isSaving = true;

    // this.ledgersApi.postItem(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       this.addItem.isSaving = false;
    //       this.addItem.dismissButton.nativeElement.click();
    //       this.addItem.resetForm();
    //       this.getLedgerItem();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.addItem.isSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  updateItem(item: any){
    console.log(item);
    this.editItem.isSaving = true;

    // this.ledgersApi.putItem(item.data, item.id)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.editItem.dismissButton.nativeElement.click();
    //       this.editItem.isSaving = false;
    //       this.getLedgerItem();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.editItem.isSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  deleteItem(){
    console.log(this.deleteId);
    this.isItemDeleting = true;

    // this.ledgersApi.deleteItem(this.deleteId)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //     this.isItemDeleting = false;
    //     this.getLedgerItem();
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
