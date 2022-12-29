import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component';
import { AddStepComponent } from '../add-step/add-step.component';
import { EditStepComponent } from '../edit-step/edit-step.component';

import { ActionPlanApiService } from 'projects/association/src/app/services/modules-api/action-plan-api/action-plan-api.service';


@Component({
  selector: 'app-plan-steps',
  templateUrl: './plan-steps.component.html',
  styleUrls: ['./plan-steps.component.scss']
})
export class PlanStepsComponent implements OnInit {

  constructor(private actionPlanApi: ActionPlanApiService) { }

  @ViewChild('addStepComponentReference', { read: AddStepComponent, static: false }) addStep!: AddStepComponent;
  @ViewChild('editStepComponentReference', { read: EditStepComponent, static: false }) editStep!: EditStepComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModalTwo!: DeleteModalTwoComponent;

  stepGridData: any[] = [];

  isFetchingStepGridData: boolean =  false;

  isStepDeleting = false;
  stepDeleteId: any;

  deleteId = "";

  lastStepId = 0;

  ngOnInit(): void {
    this.getPlanStep();
  }

  getPlanStep(){
    this.isFetchingStepGridData = true;

    this.actionPlanApi.getPlanStep()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.stepGridData = res;
          this.isFetchingStepGridData = false;

          try { this.lastStepId = Number((res[res.length - 1]).item_number) }
          catch{ this.lastStepId = 0 }
        },
        error: (err) => {
          console.log(err);
          this.isFetchingStepGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  createStep(data: any){
    console.log(data);
    this.addStep.isSaving = true;

    this.actionPlanApi.postStep(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.addStep.isSaving = false;

          if(res.id){
            this.addStep.dismissButton.nativeElement.click();
            this.getPlanStep();
            this.addStep.resetForm();
          }
        },
        error: (err) => {
          console.log(err);
          this.addStep.isSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  updateStep(step: any){
    console.log(step);
    this.editStep.isSaving = true;

    this.actionPlanApi.putStep(step.data, step.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.editStep.dismissButton.nativeElement.click();
          this.editStep.isSaving = false;
          this.getPlanStep();
        },
        error: (err) => {
          console.log(err);
          this.editStep.isSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  deleteStep(){
    this.isStepDeleting = true;

    this.actionPlanApi.deleteStep(this.stepDeleteId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isStepDeleting = false;
          this.getPlanStep();
        },
        error: (err) => {
          console.log(err);
          this.isStepDeleting = false;
          this.connectionToast.openToast();
        }
      })
  }

  openEditStep(data: any){
    console.log(data);
    this.editStep.openModal(data);
  }

  // deletion modals

  confirmStepDelete(deleteId: any){
    console.log(deleteId);

    this.stepDeleteId = deleteId;    
    this.deleteModalTwo.openModal();
  }

}
