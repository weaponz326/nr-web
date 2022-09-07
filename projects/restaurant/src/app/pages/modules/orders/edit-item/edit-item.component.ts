import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { ItemFormComponent } from '../item-form/item-form.component'

import { OrderItem } from 'projects/restaurant/src/app/models/modules/orders/orders.model';


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

  orderItemData: any;

  isItemSaving = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.orderItemData = data;

    this.itemForm.itemForm.controls.menuItem.setValue(data.menu_item.item_name);
    this.itemForm.itemForm.controls.price.setValue(data.menu_item.price);
    this.itemForm.itemForm.controls.quantity.setValue(data.quantity);
    this.itemForm.selectedMenuItemId = data.menu_item.id;
    this.itemForm.selectedMenuItemData = data.menu_item;

    this.editButton.nativeElement.click();
  }

  saveItem(){
    let data: OrderItem = {
      order: sessionStorage.getItem('restaurant_order_id') as string,
      quantity: this.itemForm.itemForm.controls.quantity.value as number,
      menu_item: this.itemForm.selectedMenuItemId,
    }

    let item = {
      id: this.orderItemData.id,
      data: data
    }

    this.saveItemEvent.emit(item);
  }

}
