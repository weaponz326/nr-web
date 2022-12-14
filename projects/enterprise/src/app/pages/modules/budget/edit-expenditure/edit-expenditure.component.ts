import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

// import { Expenditure } from 'projects/enterprise/src/app/models/modules/budget/budget.model';


@Component({
  selector: 'app-edit-expenditure',
  templateUrl: './edit-expenditure.component.html',
  styleUrls: ['./edit-expenditure.component.scss']
})
export class EditExpenditureComponent implements OnInit {

  constructor() { }

  @Output() saveExpenditureEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  expenditureFormData: any;

  isSaving = false;
  budgetData: any;

  editExpenditureForm = new FormGroup({
    itemNumber: new FormControl({value: '', disabled: true}),
    itemDescription: new FormControl(''),
    amount: new FormControl(0)
  })

  ngOnInit(): void {
  }

  openModal(expenditure: any){
    this.expenditureFormData = expenditure;

    this.editExpenditureForm.controls.itemNumber.setValue(this.expenditureFormData.item_number);
    this.editExpenditureForm.controls.itemDescription.setValue(this.expenditureFormData.item_description);
    this.editExpenditureForm.controls.amount.setValue(this.expenditureFormData.amount);

    this.editButton.nativeElement.click();
  }

  saveExpenditure(){
    // let data: Expenditure = {
    let data = {
      item_number: this.editExpenditureForm.controls.itemNumber.value as string,
      item_description: this.editExpenditureForm.controls.itemDescription.value as string,
      amount: this.editExpenditureForm.controls.amount.value as number,
      budget: sessionStorage.getItem('enterprise_budget_id') as string,
    }

    let expenditure = {
      id: this.expenditureFormData.id,
      data: data
    }

    this.saveExpenditureEvent.emit(expenditure);
  }

}
