import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { BudgetTablesComponent } from '../budget-tables/budget-tables.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { BudgetApiService } from 'projects/enterprise/src/app/services/modules-api/budget-api/budget-api.service';
// import { BudgetPrintService } from 'projects/enterprise/src/app/services/modules-printing/budget-print/budget-print.service';

import { Budget } from 'projects/enterprise/src/app/models/modules/budget/budget.model';


@Component({
  selector: 'app-view-budget',
  templateUrl: './view-budget.component.html',
  styleUrls: ['./view-budget.component.scss']
})
export class ViewBudgetComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private budgetApi: BudgetApiService,
    // private budgetPrint: BudgetPrintService
  ) { }

  @ViewChild('budgetTablesComponentReference', { read: BudgetTablesComponent, static: false }) budgetTables!: BudgetTablesComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  @ViewChild('deleteButtonElementReference', { read: ElementRef, static: false }) deleteButtonElement!: ElementRef;

  navHeading: any[] = [
    { text: "All Budgets", url: "/home/budget/all-budget" },
    { text: "View Budget", url: "/home/budget/view-budget" },
  ];

  budgetFormData: any;

  ioe = 0;

  isBudgetLoading: boolean = false;
  isBudgetSaving: boolean = false;
  isBudgetDeleting: boolean = false;

  budgetForm = new FormGroup({
    budgetName: new FormControl(''),
    budgetType: new FormControl('')
  })

  ngOnInit(): void {
    this.getBudget();
  }

  getBudget(){
    this.isBudgetLoading = true;

    this.budgetApi.getBudget()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.budgetFormData = res;
          this.budgetForm.controls.budgetName.setValue(this.budgetFormData.budget_name);
          this.budgetForm.controls.budgetType.setValue(this.budgetFormData.budget_type);

          this.isBudgetLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isBudgetLoading = false;
          this.connectionToast.openToast();
        }
    })
  }

  updateBudget(){
    let data: Budget = {
      account: this.customCookie.getCookie('enterprise_id') as string,
      budget_name: this.budgetForm.controls.budgetName.value as string,
      budget_type: this.budgetForm.controls.budgetType.value as string
    }

    console.log(data);
    this.isBudgetSaving = true;

    this.budgetApi.putBudget(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isBudgetSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isBudgetSaving = false;
        }
    })
  }

  confirmDelete(){
    this.deleteButtonElement.nativeElement.click();
  }

  deleteBudget(){
    this.isBudgetDeleting = true;
    console.log('deleting...');

    this.budgetApi.deleteBudget()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/budget/all-budget');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isBudgetDeleting = false;
        }
      })
  }

  getIoe(e: any){
    this.ioe = e;
  }

  onPrint(){
    console.log("lets start printing...");
    // this.budgetPrint.printViewBudget();
  }

}
