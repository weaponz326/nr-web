import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { ItemFormComponent } from '../item-form/item-form.component'

// import { PrescriptionItem } from 'projects/hospital/src/app/models/modules/prescriptions/prescriptions.model';


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

  prescriptionItemData: any;

  isItemSaving = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.prescriptionItemData = data;

    this.itemForm.itemForm.controls.itemNumber.setValue(data.item_number);
    this.itemForm.itemForm.controls.medicine.setValue(data.medicine);
    this.itemForm.itemForm.controls.dosage.setValue(data.dosage);
    this.itemForm.itemForm.controls.remarks.setValue(data.remarks);

    this.editButton.nativeElement.click();
  }

  saveItem(){
    // let data: PrescriptionItem = {
    let data = {
      item_number: this.itemForm.itemForm.controls.itemNumber.value as number,
      prescription: sessionStorage.getItem('hospital_prescription_id') as string,
      medicine: this.itemForm.itemForm.controls.medicine.value as string,
      dosage: this.itemForm.itemForm.controls.dosage.value as string,
      remarks: this.itemForm.itemForm.controls.remarks.value as string,
    }

    let item = {
      id: this.prescriptionItemData.id,
      data: data
    }

    this.saveItemEvent.emit(item);
  }
  
}
