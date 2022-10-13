import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { StockItemFormComponent } from '../stock-item-form/stock-item-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie.service';
import { KitchenStockApiService } from 'projects/restaurant/src/app/services/modules-api/kitchen-stock-api/kitchen-stock-api.service';

import { StockItem } from 'projects/restaurant/src/app/models/modules/kitchen-stock/kitchen-stock.model';


@Component({
  selector: 'app-add-stock-item',
  templateUrl: './add-stock-item.component.html',
  styleUrls: ['./add-stock-item.component.scss']
})
export class AddStockItemComponent implements OnInit {

  constructor(
    private customCookie: CustomCookieService,
    private kitchenStockApi: KitchenStockApiService
  ) { }

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('stockItemFormComponentReference', { read: StockItemFormComponent, static: false }) stockItemForm!: StockItemFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isItemSaving = false;

  ngOnInit(): void {
  }

  getNewStockItemCodeConfig(){
    this.stockItemForm.stockItemForm.controls.itemCode.disable();

    this.kitchenStockApi.getNewStockItemCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.code)
            this.stockItemForm.stockItemForm.controls.itemCode.setValue(res.code);
          else
            this.stockItemForm.stockItemForm.controls.itemCode.enable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }
  
  openModal(){
    this.addButton.nativeElement.click();
    this.getNewStockItemCodeConfig();
  }

  saveItem(){
    let data: StockItem = {
      account: this.customCookie.getCookie('restaurant_id') as string,
      item_code: this.stockItemForm.stockItemForm.controls.itemCode.value as string,
      item_name: this.stockItemForm.stockItemForm.controls.itemName.value as string,
      category: this.stockItemForm.stockItemForm.controls.category.value as string,
      item_type: this.stockItemForm.stockItemForm.controls.itemType.value as string,
      quantity: this.stockItemForm.stockItemForm.controls.quantity.value as number,
      refill_ordered: this.stockItemForm.stockItemForm.controls.refillOrdered.value as number,
    }

    this.saveItemEvent.emit(data);
  }

  resetForm(){
    this.stockItemForm.stockItemForm.controls.itemCode.setValue('');
    this.stockItemForm.stockItemForm.controls.itemName.setValue('');
    this.stockItemForm.stockItemForm.controls.category.setValue('');
    this.stockItemForm.stockItemForm.controls.itemType.setValue('');
    this.stockItemForm.stockItemForm.controls.quantity.setValue(0);
    this.stockItemForm.stockItemForm.controls.refillOrdered.setValue(0);
  }

}
