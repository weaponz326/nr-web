import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { BudgetApiService } from 'projects/personal/src/app/services/modules-api/budget-api/budget-api.service';

import { Budget } from 'projects/personal/src/app/models/modules/budget/budget.model';


@Component({
  selector: 'app-new-budget',
  templateUrl: './new-budget.component.html',
  styleUrls: ['./new-budget.component.scss']
})
export class NewBudgetComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private budgetApi: BudgetApiService
  ) { }

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isSavingBudget = false;

  budgetForm = new FormGroup({
    budgetCode: new FormControl(''),
    budgetName: new FormControl(''),
    budgetType: new FormControl('')
  })

  ngOnInit(): void {
    this.getNewBudgetCodeConfig();
  }

  openModal(){
    this.budgetForm.controls.budgetType.setValue("Monthly");
    this.newButton.nativeElement.click();
  }

  createBudget(){
    this.isSavingBudget = true;

    let data: Budget = {
      user: this.customCookie.getCookie('personal_id') as string,
      budget_code: this.budgetForm.controls.budgetCode.value as string,
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

  getNewBudgetCodeConfig(){
    this.budgetForm.controls.budgetCode.disable();

    this.budgetApi.getNewBudgetCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.code)
            this.budgetForm.controls.budgetCode.setValue(res.code);
          else
            this.budgetForm.controls.budgetCode.enable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
