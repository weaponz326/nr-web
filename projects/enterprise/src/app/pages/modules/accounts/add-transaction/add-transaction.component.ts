import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { TransactionFormComponent } from '../transaction-form/transaction-form.component';
import { Transaction } from 'projects/enterprise/src/app/models/modules/accounts/accounts.model';


@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {

  constructor() { }

  @Output() saveTransactionEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('transactionFormComponentReference', { read: TransactionFormComponent, static: false }) transactionForm!: TransactionFormComponent;

  isSaving = false;

  ngOnInit(): void {
  }

  openModal(){
    this.transactionForm.transactionForm.controls.transactionDate.setValue(new Date().toISOString().slice(0, 16));
    this.transactionForm.transactionForm.controls.transactionType.setValue("Credit");
    this.transactionForm.transactionForm.controls.amount.setValue(0);

    this.addButton.nativeElement.click();
  }

  saveTransaction(){
    let data: Transaction = {
      transaction_date: this.transactionForm.transactionForm.controls.transactionDate.value,
      description: this.transactionForm.transactionForm.controls.description.value as string,
      transaction_type: this.transactionForm.transactionForm.controls.transactionType.value as string,
      amount: this.transactionForm.transactionForm.controls.amount.value as number,
      account: sessionStorage.getItem('enterprise_account_id') as string,
    }

    this.saveTransactionEvent.emit(data);
  }

  resetForm(){
    this.transactionForm.transactionForm.controls.transactionDate.setValue(new Date().toISOString().slice(0, 16));
    this.transactionForm.transactionForm.controls.description.setValue('');
    this.transactionForm.transactionForm.controls.transactionType.setValue('');
    this.transactionForm.transactionForm.controls.amount.setValue(0);
  }

}
