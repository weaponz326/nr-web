import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AddItemComponent } from '../add-item/add-item.component';
import { EditItemComponent } from '../edit-item/edit-item.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
// import { DeleteModalComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal/delete-modal.component';

// import { FeesApiService } from 'projects/school/src/app/services/modules/fees-api/fees-api.service';
// import { FeesPrintService } from 'projects/school/src/app/services/printing/fees-print/fees-print.service';


@Component({
  selector: 'app-fees-items',
  templateUrl: './fees-items.component.html',
  styleUrls: ['./fees-items.component.scss']
})
export class FeesItemsComponent implements OnInit {

  constructor(
    private router: Router,
    // private feesApi: FeesApiService,
    // private feesPrint: FeesPrintService
  ) { }

  @ViewChild('addItemComponentReference', { read: AddItemComponent, static: false }) addItem!: AddItemComponent;
  @ViewChild('editItemComponentReference', { read: EditItemComponent, static: false }) editItem!: EditItemComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('deleteModalComponentReference', { read: DeleteModalComponent, static: false }) deleteModal!: DeleteModalComponent;

  navHeading: any[] = [
    { text: "All Items", url: "/home/items/all-items" },
  ];

  itemsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  deleteId: any;

  ngOnInit(): void {
    this.getFeesFeesItem();
  }

  getFeesFeesItem(){
    this.isFetchingGridData = true;

    // this.feesApi.getFeesFeesItem()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.itemsGridData = res.docs;
    //       this.isFetchingGridData = false;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isFetchingGridData = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  createFeesItem(data: any){
    console.log('u are saving a new item');

    console.log(data);
    this.addItem.isSaving = true;

    // this.feesApi.createFeesItem(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.addItem.isSaving = false;
    //       this.addItem.resetForm();
    //       this.addItem.dismissButton.nativeElement.click();
    //       this.isDataAvailable = false;

    //       this.getFeesFeesItem();
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.addItem.isSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  updateFeesItem(item: any){
    console.log('u are updating a item');

    console.log(item);
    this.editItem.isSaving = true;

    // this.feesApi.updateFeesItem(item.id, item.data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.editItem.dismissButton.nativeElement.click();
    //       this.editItem.isSaving = false;
    //       this.getFeesFeesItem();
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.editItem.isSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  confirmDelete(id: any){
    this.deleteId = id;
    // this.deleteModal.openModal();
  }

  deleteFeesItem(){
    // this.feesApi.deleteFeesItem(this.deleteId)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.getFeesFeesItem();
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  onPrint(){
    console.log("lets start printing...");
    // this.feesPrint.printAllItems()
  }

}
