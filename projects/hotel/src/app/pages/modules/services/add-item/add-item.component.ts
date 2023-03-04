import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { ItemFormComponent } from '../item-form/item-form.component'

import { ServiceItem } from 'projects/hotel/src/app/models/modules/services/services.model';


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

  isItemSaving = false;

  ngOnInit(): void {
  }

  openModal(lastId: any){
    this.itemForm.itemForm.controls.itemNumber.setValue(lastId + 1);
    this.itemForm.itemForm.controls.itemDate.setValue(new Date().toISOString().slice(0, 10));

    this.addButton.nativeElement.click();
  }

  saveItem(){
    let data: ServiceItem = {
      service: sessionStorage.getItem('hotel_service_id') as string,
      item_number: this.itemForm.itemForm.controls.itemNumber.value as number,
      item_date: this.itemForm.itemForm.controls.itemDate.value,
      description: this.itemForm.itemForm.controls.description.value as string,
      amount: this.itemForm.itemForm.controls.amount.value as number,
    }

    this.saveItemEvent.emit(data);
  }

  resetForm(){
    this.itemForm.itemForm.controls.itemNumber.setValue(null);
    this.itemForm.itemForm.controls.itemDate.setValue(new Date().toISOString().slice(0, 16));
    this.itemForm.itemForm.controls.description.setValue('');
    this.itemForm.itemForm.controls.amount.setValue(0.00);
  }

}
