import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SelectTermComponent } from '../../../../components/select-windows/terms-windows/select-term/select-term.component';
import { SelectDepartmentComponent } from '../../../../components/select-windows/classes-windows/select-department/select-department.component';


@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.scss']
})
export class SubjectFormComponent implements OnInit {

  constructor() { }

  @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;
  @ViewChild('selectDepartmentComponentReference', { read: SelectDepartmentComponent, static: false }) selectDepartment!: SelectDepartmentComponent;

  selectedTermId = "";
  selectedDepartmentId = "";

  subjectForm = new FormGroup({
    subjectCode: new FormControl(''),
    subjectName: new FormControl(''),
    term: new FormControl({value: '', disabled: true}),
    department: new FormControl({value: '', disabled: true}),
    description: new FormControl(''),
  });

  ngOnInit(): void {
  }

  openTermWindow(){
    console.log("You are opening select term window")
    this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    this.selectedTermId = termData.id;
    this.subjectForm.controls.term.setValue(termData.term_name);
  }

  openDepartmentWindow(){
    console.log("You are opening select department window")
    this.selectDepartment.openModal();
  }

  onDepartmentSelected(departmentData: any){
    console.log(departmentData);

    this.selectedDepartmentId = departmentData.id;
    this.subjectForm.controls.department.setValue(departmentData.department_name);
  }

}
