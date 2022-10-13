import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { StockItemFormComponent } from '../stock-item-form/stock-item-form.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie.service';
import { StockItem } from 'projects/restaurant/src/app/models/modules/kitchen-stock/kitchen-stock.model';


@Component({
  selector: 'app-edit-stock-item',
  templateUrl: './edit-stock-item.component.html',
  styleUrls: ['./edit-stock-item.component.scss']
})
export class EditStockItemComponent implements OnInit {

  constructor(private customCookie: CustomCookieService) { }

  @Output() saveItemEvent = new EventEmitter<any>();
  @Output() deleteItemEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('stockItemFormComponentReference', { read: StockItemFormComponent, static: false }) stockItemForm!: StockItemFormComponent;

  navHeading: any[] = [
    { text: "All Items", url: "/home/kitchen-stock/all-stock-items" },
    { text: "View Item", url: "/home/kitchen-stock/view-stock-item" },
  ];

  stockItemData: any;

  isItemSaving = false;
  isItemDeleting = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.stockItemData = data;

    this.stockItemForm.stockItemForm.controls.itemCode.setValue(data.item_code);
    this.stockItemForm.stockItemForm.controls.itemName.setValue(data.item_name);
    this.stockItemForm.stockItemForm.controls.category.setValue(data.category);
    this.stockItemForm.stockItemForm.controls.itemType.setValue(data.item_type);
    this.stockItemForm.stockItemForm.controls.quantity.setValue(data.quantity);
    this.stockItemForm.stockItemForm.controls.refillOrdered.setValue(data.refill_ordered);

    this.editButton.nativeElement.click();
  }

  saveItem(){
    let data = {
      account: this.customCookie.getCookie('restaurant_id'),
      item_code: this.stockItemForm.stockItemForm.controls.itemCode.value,
      item_name: this.stockItemForm.stockItemForm.controls.itemName.value,
      category: this.stockItemForm.stockItemForm.controls.category.value,
      item_type: this.stockItemForm.stockItemForm.controls.itemType.value,
      quantity: this.stockItemForm.stockItemForm.controls.quantity.value,
      refill_ordered: this.stockItemForm.stockItemForm.controls.refillOrdered.value,
    }

    let item = {
      id: this.stockItemData.id,
      data: data
    }

    this.saveItemEvent.emit(item);
  }

  deleteItem(){
    this.deleteItemEvent.emit(this.stockItemData.id);
  }

}
