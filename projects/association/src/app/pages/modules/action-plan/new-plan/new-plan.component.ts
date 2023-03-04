import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { ActionPlanApiService } from 'projects/association/src/app/services/modules-api/action-plan-api/action-plan-api.service';

import { ActionPlan } from 'projects/association/src/app/models/modules/action-plan/action-plan.model';


@Component({
  selector: 'app-new-plan',
  templateUrl: './new-plan.component.html',
  styleUrls: ['./new-plan.component.scss']
})
export class NewPlanComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private actionPlanApi: ActionPlanApiService
  ) { }

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isSavingPlan = false;

  planForm = new FormGroup({
    planCode: new FormControl(''),
    planTitle: new FormControl(''),
    description: new FormControl(''),
    planDate: new FormControl()
  })

  ngOnInit(): void {
  }

  openModal(){
    this.newButton.nativeElement.click();
  }

  createPlan(){
    this.isSavingPlan = true;

    let data: ActionPlan = {
      account: this.customCookie.getCookie('association_id') as string,
      plan_code: this.planForm.controls.planCode.value as string,
      plan_title: this.planForm.controls.planTitle.value as string,
      description: this.planForm.controls.description.value as string,
      plan_date: this.planForm.controls.planDate.value
    }

    console.log(data);

    this.actionPlanApi.postActionPlan(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            sessionStorage.setItem('association_actionPlan_id', res.id);
            this.router.navigateByUrl('/home/action-plan/view-action-plan');
            this.dismissButton.nativeElement.click();
          }

          this.isSavingPlan = false;
        },
        error: (err) => {
          this.connectionToast.openToast();
          this.isSavingPlan = false;
          console.log(err);
        }
      })
  }

}
