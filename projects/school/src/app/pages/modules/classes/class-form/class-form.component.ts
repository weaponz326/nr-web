import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SelectTermComponent } from '../../../../components/select-windows/terms-windows/select-term/select-term.component';
import { SelectDepartmentComponent } from '../../../../components/select-windows/classes-windows/select-department/select-department.component';
import { SelectTeacherComponent } from '../../../../components/select-windows/teachers-windows/select-teacher/select-teacher.component';


@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.scss']
})
export class ClassFormComponent implements OnInit {

  constructor() { }

  @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;
  @ViewChild('selectDepartmentComponentReference', { read: SelectDepartmentComponent, static: false }) selectDepartment!: SelectDepartmentComponent;
  @ViewChild('selectTeacherComponentReference', { read: SelectTeacherComponent, static: false }) selectTeacher!: SelectTeacherComponent;

  selectedTermId = "";
  selectedDepartmentId = "";
  selectedTeacherId = "";

  classForm = new FormGroup({
    className: new FormControl(''),
    classAbbreviation: new FormControl(''),
    grade: new FormControl(''),
    term: new FormControl({value: "", disabled: true}),
    department: new FormControl({value: "", disabled: true}),
    classTeacher: new FormControl({value: "", disabled: true}),
    location: new FormControl(''),
  })

  ngOnInit(): void {
  }

  openTermWindow(){
    console.log("You are opening select term window")
    this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    this.classForm.controls.term.setValue(termData.term_name);
    this.selectedTermId = termData.id;
  }

  openDepartmentWindow(){
    console.log("You are opening select term window")
    this.selectDepartment.openModal();
  }

  onDepartmentSelected(departmentData: any){
    console.log(departmentData);

    this.classForm.controls.department.setValue(departmentData.department_name);
    this.selectedDepartmentId = departmentData.id;
  }

  openTeacherWindow(){
    console.log("You are opening select term window")
    this.selectTeacher.openModal();
  }

  onTeacherSelected(teacherData: any){
    console.log(teacherData);

    this.classForm.controls.classTeacher.setValue(teacherData.first_name + " " + teacherData.last_name);
    this.selectedTeacherId = teacherData.id;
  }

}
