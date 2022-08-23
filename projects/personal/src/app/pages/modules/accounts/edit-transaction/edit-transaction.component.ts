import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { TransactionFormComponent } from '../transaction-form/transaction-form.component';
import { Transaction } from 'projects/personal/src/app/models/modules/accounts/accounts.model';


@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.scss']
})
export class EditTransactionComponent implements OnInit {

  constructor() { }

  @Output() saveTransactionEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('transactionFormComponentReference', { read: TransactionFormComponent, static: false }) transactionForm!: TransactionFormComponent;

  transactionFormData: any;

  isSaving = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.transactionFormData = data;

    this.transactionForm.transactionForm.controls.transactionDate.setValue(new Date(this.transactionFormData.transaction_date).toISOString().slice(0, 16));
    this.transactionForm.transactionForm.controls.description.setValue(this.transactionFormData.description);
    this.transactionForm.transactionForm.controls.transactionType.setValue(this.transactionFormData.transaction_type);
    this.transactionForm.transactionForm.controls.amount.setValue(this.transactionFormData.amount);

    this.editButton.nativeElement.click();
  }

  saveTransaction(){
    let data: Transaction = {
      transaction_date: this.transactionForm.transactionForm.controls.transactionDate.value,
      description: this.transactionForm.transactionForm.controls.description.value as string,
      transaction_type: this.transactionForm.transactionForm.controls.transactionType.value as string,
      amount: this.transactionForm.transactionForm.controls.amount.value as number,
      account: sessionStorage.getItem('personal_account_id') as string,
    }

    let transaction = {
      id: this.transactionFormData.id,
      data: data
    }

    this.saveTransactionEvent.emit(transaction);
  }

}
