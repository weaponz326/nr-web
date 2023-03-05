import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { InventoryFormComponent } from '../inventory-form/inventory-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { SelectProductComponent } from '../../../../components/select-windows/products-windows/select-product/select-product.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { InventoryApiService } from 'projects/shop/src/app/services/modules-api/inventory-api/inventory-api.service';

import { Inventory } from 'projects/shop/src/app/models/modules/inventory/inventory.model';


@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss']
})
export class AddInventoryComponent implements OnInit {

  constructor(
    private customCookie: CustomCookieService,
    // private inventoryApi: InventoryApiService
  ) { }

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('selectProductComponentReference', { read: SelectProductComponent, static: false }) selectProduct!: SelectProductComponent;

  @ViewChild('inventoryFormComponentReference', { read: InventoryFormComponent, static: false }) inventoryForm!: InventoryFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isItemSaving = false;

  ngOnInit(): void {
  }  
  
  openModal(){
    this.addButton.nativeElement.click();
    this.getNewInventoryCodeConfig();
  }

  saveItem(){
    let data: Inventory = {
      account: this.customCookie.getCookie('shop_id') as string,
      product: this.inventoryForm.selectedProductId,
      inventory_code: this.inventoryForm.inventoryForm.controls.inventoryCode.value as string,
      stock: this.inventoryForm.inventoryForm.controls.stock.value as number,
      refill_ordered: this.inventoryForm.inventoryForm.controls.refillOrdered.value as number,
      location: this.inventoryForm.inventoryForm.controls.location.value as string,
      container: this.inventoryForm.inventoryForm.controls.container.value as string,
      batch_number: this.inventoryForm.inventoryForm.controls.batchNumber.value as string,
      manufacturing_date: this.inventoryForm.inventoryForm.controls.manufacturingDate.value,
      expiry_date: this.inventoryForm.inventoryForm.controls.expiryDate.value,
    }

    this.saveItemEvent.emit(data);
  }

  resetForm(){
    this.inventoryForm.inventoryForm.controls.inventoryCode.setValue('');
    this.inventoryForm.inventoryForm.controls.productName.setValue('');
    this.inventoryForm.inventoryForm.controls.productCode.setValue('');
    this.inventoryForm.inventoryForm.controls.unitPrice.setValue(0.00);
    this.inventoryForm.inventoryForm.controls.stock.setValue(0);
    this.inventoryForm.inventoryForm.controls.refillOrdered.setValue(0);
    this.inventoryForm.inventoryForm.controls.location.setValue('');
    this.inventoryForm.inventoryForm.controls.container.setValue('');
    this.inventoryForm.inventoryForm.controls.batchNumber.setValue('');
    this.inventoryForm.inventoryForm.controls.manufacturingDate.setValue('');
    this.inventoryForm.inventoryForm.controls.expiryDate.setValue('');
  }

  getNewInventoryCodeConfig(){
    // this.inventoryForm.inventoryForm.controls.inventoryCode.disable();

    // this.inventoryApi.getNewInventoryCodeConfig()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       if(res.code)
    //         this.inventoryForm.inventoryForm.controls.itemCode.setValue(res.code);
    //       else
    //         this.inventoryForm.inventoryForm.controls.itemCode.enable();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  openProductWindow(){
    console.log("You are opening select product window")
    this.selectProduct.openModal();
  }

  onProductSelected(productData: any){
    console.log(productData);

    this.inventoryForm.selectedProductId = productData.id;
    this.inventoryForm.inventoryForm.controls.productName.setValue(productData.product_name);
    this.inventoryForm.inventoryForm.controls.productCode.setValue(productData.product_code);
    this.inventoryForm.inventoryForm.controls.unitPrice.setValue(productData.price);
  }

}
