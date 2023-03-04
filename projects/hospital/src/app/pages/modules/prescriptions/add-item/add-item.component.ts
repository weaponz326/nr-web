import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { ItemFormComponent } from '../item-form/item-form.component'

// import { PrescriptionItem } from 'projects/hospital/src/app/models/modules/prescriptions/prescriptions.model';


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
    this.itemForm.itemForm.controls.remarks.setValue('');

    this.addButton.nativeElement.click();
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

    this.saveItemEvent.emit(data);
  }

  resetForm(){
    this.itemForm.itemForm.controls.itemNumber.setValue(null);
    this.itemForm.itemForm.controls.medicine.setValue('');
    this.itemForm.itemForm.controls.dosage.setValue('');
    this.itemForm.itemForm.controls.remarks.setValue('');
  }

}
