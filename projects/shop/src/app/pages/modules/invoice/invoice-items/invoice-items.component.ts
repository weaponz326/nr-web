import { Component, OnInit, ViewChild } from '@angular/core';

import { AddItemComponent } from '../add-item/add-item.component'
import { EditItemComponent } from '../edit-item/edit-item.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component'

// import { InvoiceApiService } from 'projects/shop/src/app/services/modules-api/invoice-api/invoice-api.service';


@Component({
  selector: 'app-invoice-items',
  templateUrl: './invoice-items.component.html',
  styleUrls: ['./invoice-items.component.scss']
})
export class InvoiceItemsComponent implements OnInit {

  constructor(
    // private invoiceApi: InvoiceApiService
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
    this.getInvoiceItem();
  }

  getInvoiceItem(){
    this.isFetchingGridData = true;

    // this.invoiceApi.getInvoiceItem()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.itemsGridData = res;
    //       this.calculateTotalPrice();

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

  calculateTotalPrice(){
    this.totalAmount = 0;
    for (let item of this.itemsGridData){
      this.totalAmount += item.menu_item.price * item.quantity;
    }

    this.patchTotalAmount();
    console.log(this.totalAmount);
  }

  postItem(data: any){
    console.log(data);
    this.addItem.isItemSaving = true;

    // this.invoiceApi.postItem(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       if(res.id){
    //         this.getInvoiceItem();

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

  putItem(invoice_item: any){
    console.log(invoice_item);
    this.editItem.isItemSaving = true;

    // this.invoiceApi.putItem(invoice_item.id, invoice_item.data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       this.editItem.isItemSaving = false;
    //       this.editItem.dismissButton.nativeElement.click();
    //       this.getInvoiceItem();
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

    // this.invoiceApi.deleteItem(this.deleteId)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.isItemDeleting = false;
    //       this.getInvoiceItem();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isItemDeleting = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  patchTotalAmount(){
    let data = { invoice_total: this.totalAmount }

    // this.invoiceApi.putInvoice(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //     },
    //     error: (err) => {
    //       console.log(err);
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
