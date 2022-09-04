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

    this.itemForm.itemForm.controls.menuItem.setValue(data.data().menu_item.data.item_name);
    this.itemForm.itemForm.controls.price.setValue(data.data().menu_item.data.price);
    this.itemForm.itemForm.controls.quantity.setValue(data.data().quantity);
    this.itemForm.selectedMenuItemId = data.data().menu_item.id;
    this.itemForm.selectedMenuItemData = data.data().menu_item.data;

    this.editButton.nativeElement.click();
  }

  saveItem(){
    let data = {
      quantity: this.itemForm.itemForm.controls.quantity.value,
      menu_item: this.itemForm.selectedMenuItemId,
    }

    let item = {
      id: this.orderItemData.id,
      data: data
    }

    this.saveItemEvent.emit(item);
  }

}
