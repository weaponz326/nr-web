import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component';

import { AddTransactionComponent } from '../add-transaction/add-transaction.component';
import { EditTransactionComponent } from '../edit-transaction/edit-transaction.component';

import { AccountsApiService } from 'projects/personal/src/app/services/modules-api/accounts-api/accounts-api.service';


@Component({
  selector: 'app-account-transactions',
  templateUrl: './account-transactions.component.html',
  styleUrls: ['./account-transactions.component.scss']
})
export class AccountTransactionsComponent implements OnInit {

  constructor(private accountsApi: AccountsApiService) { }

  @Output() balanceEvent = new EventEmitter<any>();

  @ViewChild('addTransactionComponentReference', { read: AddTransactionComponent, static: false }) addTransaction!: AddTransactionComponent;
  @ViewChild('editTransactionComponentReference', { read: EditTransactionComponent, static: false }) editTransaction!: EditTransactionComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;

  transactionsGridData: any[] = [];

  deleteId = "";
  balance = 0;

  isFetchingGridData = false;
  isTransactionDeleting = false;

  ngOnInit(): void {
    this.getAccountTransaction();
  }

  calculateBalance(){
    this.balance = 0;
    for (let transaction of this.transactionsGridData){
      if (transaction.transaction_type == "Credit")
        this.balance += +transaction.amount;
      else
        this.balance -= +transaction.amount;
    }

    this.balanceEvent.emit(this.balance);
    console.log(this.balance);
  }

  getAccountTransaction(){
    this.isFetchingGridData = true;

    this.accountsApi.getAccountTransactions()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.transactionsGridData = res;
          this.isFetchingGridData = false;
          this.calculateBalance();
        },
        error: (err) => {
          console.log(err);
          this.isFetchingGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  createTransaction(data: any){
    console.log(data);
    this.addTransaction.isSaving = true;

    this.accountsApi.postTransaction(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.addTransaction.isSaving = false;
          this.addTransaction.dismissButton.nativeElement.click();
          this.addTransaction.resetForm();
          this.getAccountTransaction();
        },
        error: (err) => {
          console.log(err);
          this.addTransaction.isSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  updateTransaction(transaction: any){
    console.log(transaction);
    this.editTransaction.isSaving = true;

    this.accountsApi.putTransaction(transaction.data, transaction.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.editTransaction.dismissButton.nativeElement.click();
          this.editTransaction.isSaving = false;
          this.getAccountTransaction();
        },
        error: (err) => {
          console.log(err);
          this.editTransaction.isSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  deleteTransaction(){
    console.log(this.deleteId);
    this.isTransactionDeleting = true;

    this.accountsApi.deleteTransaction(this.deleteId)
      .subscribe({
        next: (res) => {
          console.log(res);
        this.isTransactionDeleting = false;
        this.getAccountTransaction();
        },
        error: (err) => {
          console.log(err);
          this.isTransactionDeleting = false;
          this.connectionToast.openToast();
        }
      })
  }

  openEditTransaction(data: any){
    console.log(data);
    this.editTransaction.openModal(data);
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

}
