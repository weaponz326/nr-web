import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Expenditure } from 'projects/personal/src/app/models/modules/budget/budget.model';


@Component({
  selector: 'app-add-expenditure',
  templateUrl: './add-expenditure.component.html',
  styleUrls: ['./add-expenditure.component.scss']
})
export class AddExpenditureComponent implements OnInit {

  constructor() { }

  @Output() saveExpenditureEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  budgetData: any;

  isSaving = false;

  addExpenditureForm = new FormGroup({
    itemNumber: new FormControl({value: '', disabled: true}),
    itemDescription: new FormControl(''),
    amount: new FormControl(0)
  })

  ngOnInit(): void {
  }

  openModal(lastId: any){
    this.addExpenditureForm.controls.itemNumber.setValue(lastId + 1);
    this.addExpenditureForm.controls.amount.setValue(0.00);
    this.addButton.nativeElement.click();
  }

  saveExpenditure(){
    let data: Expenditure = {
      item_number: this.addExpenditureForm.controls.itemNumber.value as string,
      item_description: this.addExpenditureForm.controls.itemDescription.value as string,
      amount: this.addExpenditureForm.controls.amount.value as number,
      budget: sessionStorage.getItem('personal_budget_id') as string,
    }

    this.saveExpenditureEvent.emit(data);
  }

  resetForm(){
    this.addExpenditureForm.controls.itemNumber.setValue('');
    this.addExpenditureForm.controls.itemDescription.setValue('');
    this.addExpenditureForm.controls.amount.setValue(0);
  }

}
