import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component';
import { AddExpenditureComponent } from '../add-expenditure/add-expenditure.component';
import { AddIncomeComponent } from '../add-income/add-income.component';
import { EditExpenditureComponent } from '../edit-expenditure/edit-expenditure.component';
import { EditIncomeComponent } from '../edit-income/edit-income.component';

import { BudgetApiService } from 'projects/personal/src/app/services/modules-api/budget-api/budget-api.service';


@Component({
  selector: 'app-budget-tables',
  templateUrl: './budget-tables.component.html',
  styleUrls: ['./budget-tables.component.scss']
})
export class BudgetTablesComponent implements OnInit {

  constructor(private budgetApi: BudgetApiService) { }

  @Output() ioeEvent = new EventEmitter<any>();

  @ViewChild('addIncomeComponentReference', { read: AddIncomeComponent, static: false }) addIncome!: AddIncomeComponent;
  @ViewChild('editIncomeComponentReference', { read: EditIncomeComponent, static: false }) editIncome!: EditIncomeComponent;
  @ViewChild('addExpenditureComponentReference', { read: AddExpenditureComponent, static: false }) addExpenditure!: AddExpenditureComponent;
  @ViewChild('editExpenditureComponentReference', { read: EditExpenditureComponent, static: false }) editExpenditure!: EditExpenditureComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModalOne!: DeleteModalOneComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModalTwo!: DeleteModalTwoComponent;

  incomeGridData: any[] = [];
  expenditureGridData: any[] = [];

  isFetchingIncomeGridData: boolean =  false;
  isFetchingExpenditureGridData: boolean =  false;

  isIncomeDeleting = false;
  isExpenditureDeleting = false;
  incomeDeleteId: any;
  expenditureDeleteId: any;

  totalIncome = 0;
  totalExpenditure = 0;

  deleteType = "";
  deleteId = "";

  lastIncomeId = 0;
  lastExpenditureId = 0;

  ngOnInit(): void {
    this.getBudgetIncome();
    this.getBudgetExpenditure();
  }

  calculateIoe(){
    let ioe = this.totalIncome - this.totalExpenditure;
    this.ioeEvent.emit(ioe);
    console.log(ioe);
  }

  // income

  calculateTotalIncome(){
    this.totalIncome = 0;
    for (let item of this.incomeGridData){
      this.totalIncome += +item.amount;
    }

    console.log(this.totalIncome);
    this.calculateIoe();
  }

  getBudgetIncome(){
    this.isFetchingIncomeGridData = true;

    this.budgetApi.getBudgetIncome()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.incomeGridData = res;
          this.isFetchingIncomeGridData = false;

          try { this.lastIncomeId = Number((res[res.length - 1]).item_number) }
          catch{ this.lastIncomeId = 0 }

          this.calculateTotalIncome();
        },
        error: (err) => {
          console.log(err);
          this.isFetchingIncomeGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  createIncome(data: any){
    console.log(data);
    this.addIncome.isSaving = true;

    this.budgetApi.postIncome(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.addIncome.isSaving = false;

          if(res.id){
            this.addIncome.dismissButton.nativeElement.click();
            this.getBudgetIncome();
            this.addIncome.resetForm();
          }
        },
        error: (err) => {
          console.log(err);
          this.addIncome.isSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  updateIncome(income: any){
    console.log(income);
    this.editIncome.isSaving = true;

    this.budgetApi.putIncome(income.data, income.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.editIncome.dismissButton.nativeElement.click();
          this.editIncome.isSaving = false;
          this.getBudgetIncome();
        },
        error: (err) => {
          console.log(err);
          this.editIncome.isSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  deleteIncome(){
    this.isIncomeDeleting = true;

    this.budgetApi.deleteIncome(this.incomeDeleteId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isIncomeDeleting = false;
          this.getBudgetIncome();
        },
        error: (err) => {
          console.log(err);
          this.isIncomeDeleting = false;
          this.connectionToast.openToast();
        }
      })
  }

  openEditIncome(data: any){
    console.log(data);
    this.editIncome.openModal(data);
  }

  // expenditure

  calculateTotalExpenditure(){
    this.totalExpenditure = 0;
    for (let item of this.expenditureGridData){
      this.totalExpenditure += +item.amount;
    }

    console.log(this.totalExpenditure);
    this.calculateIoe();
  }

  getBudgetExpenditure(){
    this.isFetchingExpenditureGridData = true;

    this.budgetApi.getBudgetExpenditure()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.expenditureGridData = res;
          this.isFetchingExpenditureGridData = false;

          try { this.lastExpenditureId = Number((res[res.length - 1]).item_number) }
          catch{ this.lastExpenditureId = 0 }

          this.calculateTotalExpenditure();
        },
        error: (err) => {
          console.log(err);
          this.isFetchingExpenditureGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  createExpenditure(data: any){
    console.log(data);
    this.addExpenditure.isSaving = true;

    this.budgetApi.postExpenditure(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.addExpenditure.isSaving = false;

          if(res.id){
            this.addExpenditure.dismissButton.nativeElement.click();
            this.getBudgetExpenditure();
            this.addExpenditure.resetForm();
          }
        },
        error: (err) => {
          console.log(err);
          this.addExpenditure.isSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  updateExpenditure(expenditure: any){
    console.log(expenditure);
    this.editExpenditure.isSaving = true;

    this.budgetApi.putExpenditure(expenditure.data, expenditure.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.editExpenditure.dismissButton.nativeElement.click();
          this.editExpenditure.isSaving = false;
          this.getBudgetExpenditure()
        },
        error: (err) => {
          console.log(err);
          this.editExpenditure.isSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  deleteExpenditure(){
    this.isExpenditureDeleting = true;

    this.budgetApi.deleteExpenditure(this.expenditureDeleteId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isExpenditureDeleting = false;
          this.getBudgetExpenditure();
        },
        error: (err) => {
          console.log(err);
          this.isExpenditureDeleting = false;
          this.connectionToast.openToast();
        }
      })
  }

  openEditExpenditure(data: any){
    console.log(data);
    this.editExpenditure.openModal(data);
  }

  // deletion modals

  confirmIncomeDelete(deleteId: any){
    console.log(deleteId);

    this.incomeDeleteId = deleteId;    
    this.deleteModalOne.openModal();
  }

  confirmExpenditureDelete(deleteId: any){
    console.log(deleteId);

    this.expenditureDeleteId = deleteId;    
    this.deleteModalTwo.openModal();
  }

}
