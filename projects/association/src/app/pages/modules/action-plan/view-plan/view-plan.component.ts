import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { ActionPlanApiService } from 'projects/association/src/app/services/modules-api/action-plan-api/action-plan-api.service';

import { ActionPlan } from 'projects/association/src/app/models/modules/action-plan/action-plan.model';


@Component({
  selector: 'app-view-plan',
  templateUrl: './view-plan.component.html',
  styleUrls: ['./view-plan.component.scss']
})
export class ViewPlanComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private actionPlanApi: ActionPlanApiService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Plans", url: "/home/action-plan/all-plans" },
    { text: "View Plan", url: "/home/action-plan/view-plan" },
  ];

  planData: any;

  isPlanLoading = false;
  isPlanSaving = false;
  isPlanDeleting = false;

  planForm = new FormGroup({
    planCode: new FormControl(''),
    planTitle: new FormControl(''),
    description: new FormControl(''),
    planDate: new FormControl()
  })

  ngOnInit(): void {
    this.getPlan();
    this.getActionPlanCodeConfig();
  }

  getPlan(){
    this.isPlanLoading = true;

    this.actionPlanApi.getActionPlan()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.planData = res;
          this.isPlanLoading = false;

          this.planForm.controls.planCode.setValue(this.planData.plan_code);
          this.planForm.controls.planTitle.setValue(this.planData.plan_title);
          this.planForm.controls.planDate.setValue(this.planData.plan_date);
          this.planForm.controls.description.setValue(this.planData.description);
        },
        error: (err) => {
          console.log(err);
          this.isPlanLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putPlan(){
    console.log('u are saving a new plan');

    let data: ActionPlan = {
      account: this.customCookie.getCookie('association_id') as string,
      plan_code: this.planForm.controls.planCode.value as string,
      plan_title: this.planForm.controls.planTitle.value as string,
      description: this.planForm.controls.description.value as string,
      plan_date: this.planForm.controls.planDate.value
    }

    console.log(data);
    this.isPlanSaving = true;

    this.actionPlanApi.putActionPlan(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isPlanSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isPlanSaving = false;
          this.connectionToast.openToast();
        }
      }) 
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deletePlan(){
    this.isPlanDeleting = true;
    
    this.actionPlanApi.deleteActionPlan()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/action-plan/all-action-plan');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })    
  }

  getActionPlanCodeConfig(){
    this.actionPlanApi.getActionPlanCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.entry_mode == "Auto")
            this.planForm.controls.planCode.disable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.plansPrint.printViewPlan();
  }

}
