import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { ItemFormComponent } from '../item-form/item-form.component'
import { SelectDrugComponent } from '../../../../components/select-windows/drugs-windows/select-drug/select-drug.component';

import { DispenseItem } from 'projects/hospital/src/app/models/modules/dispensary/dispensary.model';


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
  @ViewChild('selectDrugComponentReference', { read: SelectDrugComponent, static: false }) selectDrug!: SelectDrugComponent;

  dispenseItemData: any;

  isItemSaving = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.dispenseItemData = data;

    this.itemForm.itemForm.controls.itemNumber.setValue(data.item_number);
    this.itemForm.itemForm.controls.drugName.setValue(data.drug?.drug_name);
    this.itemForm.itemForm.controls.ndcNumber.setValue(data.drug?.ndc_number);
    this.itemForm.itemForm.controls.quantity.setValue(data.quantity);
    this.itemForm.itemForm.controls.remarks.setValue(data.remarks);

    this.itemForm.selectedDrugId = data.drug?.id;

    this.editButton.nativeElement.click();
  }

  saveItem(){
    let data: DispenseItem = {
      item_number: this.itemForm.itemForm.controls.itemNumber.value as number,
      drug: this.itemForm.selectedDrugId,
      dispense: sessionStorage.getItem('hospital_dispense_id') as string,
      quantity: this.itemForm.itemForm.controls.quantity.value as number,
      remarks: this.itemForm.itemForm.controls.remarks.value as string,
    }

    let item = {
      id: this.dispenseItemData.id,
      data: data
    }

    this.saveItemEvent.emit(item);
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
