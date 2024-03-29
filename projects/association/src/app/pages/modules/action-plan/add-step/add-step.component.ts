import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { PlanStep } from 'projects/association/src/app/models/modules/action-plan/action-plan.model';


@Component({
  selector: 'app-add-step',
  templateUrl: './add-step.component.html',
  styleUrls: ['./add-step.component.scss']
})
export class AddStepComponent implements OnInit {

  constructor() { }

  @Output() saveStepEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  isSaving = false;

  addStepForm = new FormGroup({
    stepNumber: new FormControl({value: '', disabled: true}),
    stepDescription: new FormControl(''),
  })

  ngOnInit(): void {
  }

  openModal(lastId: any){
    this.addStepForm.controls.stepNumber.setValue(lastId + 1);
    this.addButton.nativeElement.click();
  }

  saveStep(){
    let data: PlanStep = {
      action_plan: sessionStorage.getItem('association_action_plan_id') as string,
      step_number: this.addStepForm.controls.stepNumber.value as string,
      step_description: this.addStepForm.controls.stepDescription.value as string,
    }

    this.saveStepEvent.emit(data);
  }

  resetForm(){
    this.addStepForm.controls.stepNumber.setValue('');
    this.addStepForm.controls.stepDescription.setValue('');
  }

}
