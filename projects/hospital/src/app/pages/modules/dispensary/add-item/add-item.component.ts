import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { ItemFormComponent } from '../item-form/item-form.component'
import { SelectDrugComponent } from '../../../../components/select-windows/drugs-windows/select-drug/select-drug.component';

import { DispenseItem } from 'projects/hospital/src/app/models/modules/dispensary/dispensary.model';


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
  @ViewChild('selectDrugComponentReference', { read: SelectDrugComponent, static: false }) selectDrug!: SelectDrugComponent;

  isItemSaving = false;

  ngOnInit(): void {
  }

  openModal(lastId: any){
    console.log(lastId + 1);
    this.itemForm.itemForm.controls.itemNumber.setValue(lastId + 1);

    this.addButton.nativeElement.click();
  }

  saveItem(){
    let data: DispenseItem = {
      item_number: this.itemForm.itemForm.controls.itemNumber.value as number,
      drug: this.itemForm.selectedDrugId,
      dispense: sessionStorage.getItem('hospital_dispense_id') as string,
      quantity: this.itemForm.itemForm.controls.quantity.value as number,
      remarks: this.itemForm.itemForm.controls.remarks.value as string,
    }

    this.saveItemEvent.emit(data);
  }

  resetForm(){
    this.itemForm.itemForm.controls.itemNumber.setValue(null);
    this.itemForm.itemForm.controls.remarks.setValue('');
    this.itemForm.itemForm.controls.drugName.setValue('');
    this.itemForm.itemForm.controls.ndcNumber.setValue('');
    this.itemForm.itemForm.controls.quantity.setValue(0);
  }

  openDrugWindow(){
    console.log("You are opening select drug item window")
    this.selectDrug.openModal();
  }

  onDrugSelected(itemData: any){
    console.log(itemData);
    this.itemForm.selectedDrugId = itemData.id;

    this.itemForm.itemForm.controls.ndcNumber.setValue(itemData?.ndc_number);
    this.itemForm.itemForm.controls.drugName.setValue(itemData?.drug_name);
  }

}
