import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { InventoryFormComponent } from '../inventory-form/inventory-form.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { Inventory } from 'projects/shop/src/app/models/modules/inventory/inventory.model';


@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.component.html',
  styleUrls: ['./edit-inventory.component.scss']
})
export class EditInventoryComponent implements OnInit {

  constructor(private customCookie: CustomCookieService) { }

  @Output() saveItemEvent = new EventEmitter<any>();
  @Output() deleteItemEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('inventoryFormComponentReference', { read: InventoryFormComponent, static: false }) inventoryForm!: InventoryFormComponent;

  navHeading: any[] = [
    { text: "All Items", url: "/home/inventory/all-inventory" },
    { text: "View Item", url: "/home/inventory/view-inventory" },
  ];

  inventoryData: any;

  isItemSaving = false;
  isItemDeleting = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.inventoryData = data;

    this.inventoryForm.inventoryForm.controls.inventoryCode.setValue(data?.product?.inventory_code);
    this.inventoryForm.inventoryForm.controls.productName.setValue(data?.product?.product_name);
    this.inventoryForm.inventoryForm.controls.productCode.setValue(data?.product?.product_code);
    this.inventoryForm.inventoryForm.controls.unitPrice.setValue(data.unit_price);
    this.inventoryForm.inventoryForm.controls.stock.setValue(data.stock);
    this.inventoryForm.inventoryForm.controls.refillOrdered.setValue(data.refill_ordered);
    this.inventoryForm.inventoryForm.controls.location.setValue(data.location);
    this.inventoryForm.inventoryForm.controls.container.setValue(data.container);
    this.inventoryForm.inventoryForm.controls.batchNumber.setValue(data.batch_number);
    this.inventoryForm.inventoryForm.controls.manufacturingDate.setValue(data.manufacturing_date);
    this.inventoryForm.inventoryForm.controls.expiryDate.setValue(data.expiry_date);

    this.editButton.nativeElement.click();
  }

  saveItem(){
    // let data: Inventory = {
    let data = {
      account: this.customCookie.getCookie('shop_id') as string,
      inventory_code: this.inventoryForm.inventoryForm.controls.inventoryCode.value as string,
      productName: this.inventoryForm.inventoryForm.controls.productName.value as string,
      productCode: this.inventoryForm.inventoryForm.controls.productCode.value as string,
      unit_price: this.inventoryForm.inventoryForm.controls.unitPrice.value as number,
      stock: this.inventoryForm.inventoryForm.controls.stock.value as number,
      refill_ordered: this.inventoryForm.inventoryForm.controls.refillOrdered.value as number,
      location: this.inventoryForm.inventoryForm.controls.location.value as string,
      container: this.inventoryForm.inventoryForm.controls.container.value as string,
      batch_number: this.inventoryForm.inventoryForm.controls.batchNumber.value as string,
      manufacturing_date: this.inventoryForm.inventoryForm.controls.manufacturingDate.value,
      expiry_date: this.inventoryForm.inventoryForm.controls.expiryDate.value,
    }

    let item = {
      id: this.inventoryData.id,
      data: data
    }

    this.saveItemEvent.emit(item);
  }

  deleteItem(){
    this.deleteItemEvent.emit(this.inventoryData.id);
  }

}
