import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { ItemFormComponent } from '../item-form/item-form.component';


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

  itemFormData: any;

  isSaving = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.itemFormData = data;

    this.itemForm.itemForm.controls.itemDate.setValue(new Date(this.itemFormData.item_date).toISOString().slice(0, 16));
    this.itemForm.itemForm.controls.referenceNumber.setValue(this.itemFormData.reference_number);
    this.itemForm.itemForm.controls.description.setValue(this.itemFormData.description);
    this.itemForm.itemForm.controls.itemType.setValue(this.itemFormData.item_type);
    this.itemForm.itemForm.controls.amount.setValue(this.itemFormData.amount);

    this.editButton.nativeElement.click();
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

    let item = {
      id: this.itemFormData.id,
      data: data
    }

    this.saveItemEvent.emit(item);
  }

}
