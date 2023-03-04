import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { ItemFormComponent } from '../item-form/item-form.component'

import { ServiceItem } from 'projects/hotel/src/app/models/modules/services/services.model';


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

    this.itemForm.itemForm.controls.itemNumber.setValue(data.item_number);
    this.itemForm.itemForm.controls.itemDate.setValue(data.item_date);
    this.itemForm.itemForm.controls.description.setValue(data.description);
    this.itemForm.itemForm.controls.amount.setValue(data.amount);

    this.editButton.nativeElement.click();
  }

  saveItem(){
    let data: ServiceItem = {
      service: sessionStorage.getItem('hotel_service_id') as string,
      item_number: this.itemForm.itemForm.controls.itemNumber.value as number,
      item_date: this.itemForm.itemForm.controls.itemDate.value,
      description: this.itemForm.itemForm.controls.description.value as string,
      amount: this.itemForm.itemForm.controls.amount.value as number,
    }

    let item = {
      id: this.orderItemData.id,
      data: data
    }

    this.saveItemEvent.emit(item);
  }
  
}
