import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { ItemFormComponent } from '../item-form/item-form.component';


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

  isSaving = false;

  ngOnInit(): void {
  }

  openModal(){
    this.itemForm.itemForm.controls.itemDate.setValue(new Date().toISOString().slice(0, 16));
    this.itemForm.itemForm.controls.itemType.setValue("Credit");
    this.itemForm.itemForm.controls.amount.setValue(0);

    this.addButton.nativeElement.click();
  }

  saveItem(){
    let data = {
      item_date: this.itemForm.itemForm.controls.itemDate.value,
      reference_number: this.itemForm.itemForm.controls.referenceNumber.value as string,
      description: this.itemForm.itemForm.controls.description.value as string,
      item_type: this.itemForm.itemForm.controls.itemType.value as string,
      amount: this.itemForm.itemForm.controls.amount.value as number,
      account: sessionStorage.getItem('enterprise_ledger_id') as string,
    }

    this.saveItemEvent.emit(data);
  }

  resetForm(){
    this.itemForm.itemForm.controls.itemDate.setValue(new Date().toISOString().slice(0, 16));
    this.itemForm.itemForm.controls.referenceNumber.setValue('');
    this.itemForm.itemForm.controls.description.setValue('');
    this.itemForm.itemForm.controls.itemType.setValue('');
    this.itemForm.itemForm.controls.amount.setValue(0);
  }

}
