import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NewBudgetComponent } from '../new-budget/new-budget.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

// import { BudgetApiService } from 'projects/enterprise/src/app/services/modules-api/budget-api/budget-api.service';
// import { BudgetPrintService } from 'projects/enterprise/src/app/services/modules-printing/budget-print/budget-print.service';


@Component({
  selector: 'app-all-budget',
  templateUrl: './all-budget.component.html',
  styleUrls: ['./all-budget.component.scss']
})
export class AllBudgetComponent implements OnInit {

  constructor(
    private router: Router,
    // private budgetApi: BudgetApiService,
    // private budgetPrint: BudgetPrintService
  ) { }

  @ViewChild('newBudgetComponentReference', { read: NewBudgetComponent, static: false }) newBudget!: NewBudgetComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Budgets", url: "/home/budget/all-budget" },
  ];

  budgetGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getUserBudget(1,20, "");
  }

  getUserBudget(page: any, size: any, sortField: any){
    this.isFetchingGridData =  true;

    // this.budgetApi.getUserBudgets(page, size, sortField)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.budgetGridData = res.results;
    //       this.currentPage = res.current_page;
    //       this.totalPages = res.total_pages;
    //       this.totalItems = res.count;

    //       this.isFetchingGridData = false;
    //       if(this.totalItems == 0)
    //         this.isDataAvailable = false
    //     },
    //     error: (err) => {
    //       this.connectionToast.openToast();
    //       this.isFetchingGridData = false;
    //       console.log(err);
    //     }
    //   })
  }

  sortTable(column: any){
    console.log(column);
    this.getUserBudget(1, 20, column);

    this.currentSortColumn = column;
  }

  viewBudget(budgetId: any){
    console.log(budgetId);

    sessionStorage.setItem("personal_budget_id", budgetId);
    this.router.navigateByUrl("/home/budget/view-budget");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.budgetPrint.printAllBudget();
  }

}
