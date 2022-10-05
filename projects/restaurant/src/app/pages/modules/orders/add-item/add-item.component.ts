import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { ItemFormComponent } from '../item-form/item-form.component'
import { SelectMenuItemComponent } from '../../../../components/select-windows/menu-windows/select-menu-item/select-menu-item.component';

import { OrderItem } from 'projects/restaurant/src/app/models/modules/orders/orders.model';


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
  @ViewChild('selectMenuItemComponentReference', { read: SelectMenuItemComponent, static: false }) selectMenuItem!: SelectMenuItemComponent;

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
    let data: OrderItem = {
      item_number: this.itemForm.itemForm.controls.itemNumber.value as number,
      order: sessionStorage.getItem('restaurant_order_id') as string,
      quantity: this.itemForm.itemForm.controls.quantity.value as number,
      menu_item: this.itemForm.selectedMenuItemId,
    }

    if(this.itemForm.selectedMenuItemId != "")
      this.saveItemEvent.emit(data);
  }

  resetForm(){
    this.itemForm.itemForm.controls.itemNumber.setValue(null);
    this.itemForm.itemForm.controls.menuItem.setValue('');
    this.itemForm.itemForm.controls.price.setValue(0.00);
    this.itemForm.itemForm.controls.quantity.setValue(1);
    this.itemForm.selectedMenuItemId = "";
    this.itemForm.selectedMenuItemData = null;
  }

  openMenuItemWindow(){
    console.log("You are opening select menu item window")
    this.selectMenuItem.openModal();
  }

  onMenuItemSelected(itemData: any){
    console.log(itemData);
    this.itemForm.selectedMenuItemId = itemData.id;
    this.itemForm.selectedMenuItemData = itemData;

    this.itemForm.itemForm.controls.menuItem.setValue(itemData.item_name);
    this.itemForm.itemForm.controls.price.setValue(itemData.price);
  }

}
