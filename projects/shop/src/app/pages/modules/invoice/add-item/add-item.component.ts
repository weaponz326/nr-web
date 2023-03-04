import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { ItemFormComponent } from '../item-form/item-form.component'
// import { SelectProductComponent } from '../../../../components/select-windows/product-windows/select-product/select-product.component';

// import { InvoiceItem } from 'projects/shop/src/app/models/modules/invoices/invoices.model';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  constructor() { }

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('itemFormComponentReference', { read: ItemFormComponent, static: false }) itemForm!: ItemFormComponent;
  // @ViewChild('selectProductComponentReference', { read: SelectProductComponent, static: false }) selectProduct!: SelectProductComponent;

  isItemSaving = false;

  ngOnInit(): void {
  }

  openModal(lastId: any){
    this.itemForm.itemForm.controls.itemNumber.setValue(lastId + 1);
    this.itemForm.itemForm.controls.price.setValue(0.00);
    this.itemForm.itemForm.controls.quantity.setValue(1);

    this.addButton.nativeElement.click();
  }

  saveItem(){    
    // let data: InvoiceItem = {
    let data = {
      item_number: this.itemForm.itemForm.controls.itemNumber.value as number,
      invoice: sessionStorage.getItem('shop_invoice_id') as string,
      quantity: this.itemForm.itemForm.controls.quantity.value as number,
      product: this.itemForm.selectedProductId,
    }

    if(this.itemForm.selectedProductId != "")
      this.saveItemEvent.emit(data);
  }

  resetForm(){
    this.itemForm.itemForm.controls.itemNumber.setValue(null);
    this.itemForm.itemForm.controls.productCode.setValue('');
    this.itemForm.itemForm.controls.productName.setValue('');
    this.itemForm.itemForm.controls.price.setValue(0.00);
    this.itemForm.itemForm.controls.quantity.setValue(1);
    this.itemForm.selectedProductId = "";
    this.itemForm.selectedProductData = null;
  }

  openProductWindow(){
    console.log("You are opening select product item window")
    // this.selectProduct.openModal();
  }

  onProductSelected(itemData: any){
    console.log(itemData);
    this.itemForm.selectedProductId = itemData.id;
    this.itemForm.selectedProductData = itemData;

    this.itemForm.itemForm.controls.productCode.setValue(itemData.product?.product_code);
    this.itemForm.itemForm.controls.productName.setValue(itemData.product?.product_name);
    this.itemForm.itemForm.controls.price.setValue(itemData.price);
  }

}
