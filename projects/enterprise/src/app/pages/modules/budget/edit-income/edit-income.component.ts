import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

// import { Income } from 'projects/enterprise/src/app/models/modules/budget/budget.model';


@Component({
  selector: 'app-edit-income',
  templateUrl: './edit-income.component.html',
  styleUrls: ['./edit-income.component.scss']
})
export class EditIncomeComponent implements OnInit {

  constructor() { }

  @Output() saveIncomeEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  incomeFormData: any;

  isSaving = false;
  budgetData: any;

  editIncomeForm = new FormGroup({
    itemNumber: new FormControl({value: '', disabled: true}),
    itemDescription: new FormControl(''),
    amount: new FormControl(0)
  })

  ngOnInit(): void {
  }

  openModal(income: any){
    this.incomeFormData = income;

    this.editIncomeForm.controls.itemNumber.setValue(this.incomeFormData.item_number);
    this.editIncomeForm.controls.itemDescription.setValue(this.incomeFormData.item_description);
    this.editIncomeForm.controls.amount.setValue(this.incomeFormData.amount);

    this.editButton.nativeElement.click();
  }

  saveIncome(){
    // let data: Income = {
    let data = {
      item_number: this.editIncomeForm.controls.itemNumber.value as string,
      item_description: this.editIncomeForm.controls.itemDescription.value as string,
      amount: this.editIncomeForm.controls.amount.value as number,
      budget: sessionStorage.getItem('enterprise_budget_id') as string,
    }

    let income = {
      id: this.incomeFormData.id,
      data: data
    }

    this.saveIncomeEvent.emit(income);
  }

}
