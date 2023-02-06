import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { ItemFormComponent } from '../item-form/item-form.component'

// import { DispenseItem } from 'projects/hospital/src/app/models/modules/dispenses/dispenses.model';


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

  dispenseItemData: any;

  isItemSaving = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.dispenseItemData = data;

    this.itemForm.itemForm.controls.itemNumber.setValue(data.item_number);
    this.itemForm.itemForm.controls.remarks.setValue(data.remarks);

    this.editButton.nativeElement.click();
  }

  saveItem(){
    // let data: DispenseItem = {
    let data = {
      item_number: this.itemForm.itemForm.controls.itemNumber.value as number,
      dispense: sessionStorage.getItem('hospital_dispense_id') as string,
      remarks: this.itemForm.itemForm.controls.remarks.value as string,
    }

    let item = {
      id: this.dispenseItemData.id,
      data: data
    }

    this.saveItemEvent.emit(item);
  }
  
}
