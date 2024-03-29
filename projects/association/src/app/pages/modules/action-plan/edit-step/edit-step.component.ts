import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { PlanStep } from 'projects/association/src/app/models/modules/action-plan/action-plan.model';


@Component({
  selector: 'app-edit-step',
  templateUrl: './edit-step.component.html',
  styleUrls: ['./edit-step.component.scss']
})
export class EditStepComponent implements OnInit {

  constructor() { }

  @Output() saveStepEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  stepFormData: any;

  isSaving = false;
  budgetData: any;

  editStepForm = new FormGroup({
    stepNumber: new FormControl({value: '', disabled: true}),
    stepDescription: new FormControl(''),
  })

  ngOnInit(): void {
  }

  openModal(step: any){
    this.stepFormData = step;

    this.editStepForm.controls.stepNumber.setValue(this.stepFormData.step_number);
    this.editStepForm.controls.stepDescription.setValue(this.stepFormData.step_description);

    this.editButton.nativeElement.click();
  }

  saveStep(){
    let data: PlanStep = {
      action_plan: sessionStorage.getItem('association_action_plan_id') as string,
      step_number: this.editStepForm.controls.stepNumber.value as string,
      step_description: this.editStepForm.controls.stepDescription.value as string,
    }

    let step = {
      id: this.stepFormData.id,
      data: data
    }

    this.saveStepEvent.emit(step);
  }

}
