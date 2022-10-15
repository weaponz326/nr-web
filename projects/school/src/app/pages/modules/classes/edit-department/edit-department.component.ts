import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { DepartmentFormComponent } from '../department-form/department-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

// import { Department } from 'projects/school/src/app/models/modules/classes/classes.model';


@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss']
})
export class EditDepartmentComponent implements OnInit {

  constructor() { }

  @Output() saveDepartmentEvent = new EventEmitter<any>();
  @Output() deleteDepartmentEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('departmentFormComponentReference', { read: DepartmentFormComponent, static: false }) departmentForm!: DepartmentFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  departmentData: any;

  isDepartmentSaving = false;
  isDepartmentDeleting = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.departmentData = data;

    this.departmentForm.departmentForm.controls.departmentCode.setValue(data.data().department_code);
    this.departmentForm.departmentForm.controls.departmentName.setValue(data.data().department_name);
    this.departmentForm.departmentForm.controls.departmentDescription.setValue(data.data().department_description);
    this.departmentForm.departmentForm.controls.term.setValue(data.data().term.data.term_name);
    this.departmentForm.departmentForm.controls.departmentHead.setValue(data.data().department_head.data.first_name + " " + data.data().department_head.data.last_name);

    this.departmentForm.selectedTermId = data.data().term.id
    this.departmentForm.selectedTermData = data.data().term.data
    this.departmentForm.selectedTeacherId = data.data().department_head.id
    this.departmentForm.selectedTeacherData = data.data().department_head.data

    this.editButton.nativeElement.click();
  }

  saveDepartment(){
    let data = {
      department_code: this.departmentForm.departmentForm.controls.departmentCode.value,
      department_name: this.departmentForm.departmentForm.controls.departmentName.value,
      department_description: this.departmentForm.departmentForm.controls.departmentDescription.value,
      department_head: this.departmentForm.selectedTeacherId,
    }

    let department = {
      id: this.departmentData.id,
      data: data
    }

    this.saveDepartmentEvent.emit(department);
  }

  deleteDepartment(){
    this.deleteDepartmentEvent.emit(this.departmentData.id);
  }

}
