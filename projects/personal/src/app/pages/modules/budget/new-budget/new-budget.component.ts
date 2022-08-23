import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { Budget } from 'projects/personal/src/app/models/modules/budget/budget.model';
import { BudgetApiService } from 'projects/personal/src/app/services/modules-api/budget-api/budget-api.service';

@Component({
  selector: 'app-new-budget',
  templateUrl: './new-budget.component.html',
  styleUrls: ['./new-budget.component.scss']
})
export class NewBudgetComponent implements OnInit {

  constructor(
    private router: Router,
    private budgetApi: BudgetApiService
  ) { }

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isSavingBudget = false;

  budgetForm = new FormGroup({
    budgetName: new FormControl(''),
    budgetType: new FormControl('')
  })

  ngOnInit(): void {
  }

  openModal(){
    this.budgetForm.controls.budgetType.setValue("Monthly");
    this.newButton.nativeElement.click();
  }

  createBudget(){
    this.isSavingBudget = true;

    let data: Budget = {
      user: localStorage.getItem('personal_id') as string,
      budget_name: this.budgetForm.controls.budgetName.value as string,
      budget_type: this.budgetForm.controls.budgetType.value as string
    }

    console.log(data);

    this.budgetApi.postBudget(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            sessionStorage.setItem('personal_budget_id', res.id);
            this.router.navigateByUrl('/home/budget/view-budget');
            this.dismissButton.nativeElement.click();
          }

          this.isSavingBudget = false;
        },
        error: (err) => {
          this.connectionToast.openToast();
          this.isSavingBudget = false;
          console.log(err);
        }
      })
  }

}
