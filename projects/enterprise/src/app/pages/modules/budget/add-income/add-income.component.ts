import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Income } from 'projects/enterprise/src/app/models/modules/budget/budget.model';


@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.scss']
})
export class AddIncomeComponent implements OnInit {

  constructor() { }

  @Output() saveIncomeEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  budgetData: any;

  isSaving = false;

  addIncomeForm = new FormGroup({
    itemNumber: new FormControl({value: '', disabled: true}),
    itemDescription: new FormControl(''),
    amount: new FormControl(0)
  })

  ngOnInit(): void {
  }

  openModal(lastId: any){
    this.addIncomeForm.controls.itemNumber.setValue(lastId + 1);
    this.addIncomeForm.controls.amount.setValue(0.00);
    this.addButton.nativeElement.click();
  }

  saveIncome(){
    let data: Income = {
      item_number: this.addIncomeForm.controls.itemNumber.value as string,
      item_description: this.addIncomeForm.controls.itemDescription.value as string,
      amount: this.addIncomeForm.controls.amount.value as number,
      budget: sessionStorage.getItem('enterprise_budget_id') as string,
    }

    this.saveIncomeEvent.emit(data);
  }

  resetForm(){
    this.addIncomeForm.controls.itemNumber.setValue('');
    this.addIncomeForm.controls.itemDescription.setValue('');
    this.addIncomeForm.controls.amount.setValue(0);
  }

}
