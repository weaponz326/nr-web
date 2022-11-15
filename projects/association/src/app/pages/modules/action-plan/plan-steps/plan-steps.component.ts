import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component';
import { AddStepComponent } from '../add-step/add-step.component';
import { EditStepComponent } from '../edit-step/edit-step.component';


@Component({
  selector: 'app-plan-steps',
  templateUrl: './plan-steps.component.html',
  styleUrls: ['./plan-steps.component.scss']
})
export class PlanStepsComponent implements OnInit {

  constructor() { }

  @ViewChild('addStepComponentReference', { read: AddStepComponent, static: false }) addStep!: AddStepComponent;
  @ViewChild('editStepComponentReference', { read: EditStepComponent, static: false }) editStep!: EditStepComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModalTwo!: DeleteModalTwoComponent;

  stepGridData: any[] = [];

  isFetchingStepGridData: boolean =  false;

  isStepDeleting = false;
  stepDeleteId: any;

  deleteId = "";

  lastIncomeId = 0;
  lastStepId = 0;

  ngOnInit(): void {
    this.getPlanStep();
  }

  getPlanStep(){
    this.isFetchingStepGridData = true;

    
  }

  postStep(data: any){
    console.log(data);
    this.addStep.isSaving = true;

    
  }

  putStep(step: any){
    console.log(step);
    this.editStep.isSaving = true;

    
  }

  deleteStep(){
    this.isStepDeleting = true;

    
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
