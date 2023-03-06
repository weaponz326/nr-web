import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { ItemFormComponent } from '../item-form/item-form.component'
import { SelectProductComponent } from '../../../../components/select-windows/products-windows/select-product/select-product.component';

import { OrderItem } from 'projects/shop/src/app/models/modules/orders/orders.model';


@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {

  constructor() { }

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('itemFormComponentReference', { read: ItemFormComponent, static: false }) itemForm!: ItemFormComponent;
  @ViewChild('selectProductComponentReference', { read: SelectProductComponent, static: false }) selectProduct!: SelectProductComponent;

  orderItemData: any;

  isItemSaving = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.orderItemData = data;

    this.itemForm.itemForm.controls.itemNumber.setValue(data.item_number);
    this.itemForm.itemForm.controls.productCode.setValue(data.product?.product_code);
    this.itemForm.itemForm.controls.productName.setValue(data.product?.product_name);
    this.itemForm.itemForm.controls.price.setValue(data.product.price);
    this.itemForm.itemForm.controls.quantity.setValue(data.quantity);
    this.itemForm.selectedProductId = data.product.id;
    this.itemForm.selectedProductData = data.product;

    this.editButton.nativeElement.click();
  }

  saveItem(){
    let data: OrderItem = {
      item_number: this.itemForm.itemForm.controls.itemNumber.value as number,
      order: sessionStorage.getItem('shop_order_id') as string,
      quantity: this.itemForm.itemForm.controls.quantity.value as number,
      product: this.itemForm.selectedProductId,
    }

    let item = {
      id: this.orderItemData.id,
      data: data
    }

    this.saveItemEvent.emit(item);
  }

  openProductWindow(){
    console.log("You are opening select product item window")
    this.selectProduct.openModal();
  }

  onProductSelected(itemData: any){
    console.log(itemData);
    this.itemForm.selectedProductId = itemData.id;
    this.itemForm.selectedProductData = itemData;

    this.itemForm.itemForm.controls.productCode.setValue(itemData?.product_code);
    this.itemForm.itemForm.controls.productName.setValue(itemData?.product_name);
    this.itemForm.itemForm.controls.price.setValue(itemData.price);
  }
  
}
