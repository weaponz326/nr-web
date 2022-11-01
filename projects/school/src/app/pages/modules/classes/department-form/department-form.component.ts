import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SelectTermComponent } from '../../../../components/select-windows/terms-windows/select-term/select-term.component';
import { SelectTeacherComponent } from '../../../../components/select-windows/teachers-windows/select-teacher/select-teacher.component';


@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent implements OnInit {

  constructor() { }

  @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;
  @ViewChild('selectTeacherComponentReference', { read: SelectTeacherComponent, static: false }) selectTeacher!: SelectTeacherComponent;

  selectedTermId = "";
  selectedTermData: any = {};
  selectedTeacherId = "";
  selectedTeacherData: any = {};

  departmentForm = new FormGroup({
    departmentName: new FormControl(''),
    departmentDescription: new FormControl(''),
    term: new FormControl(''),
    departmentHead: new FormControl(''),
  })

  ngOnInit(): void {
  }

  openTermWindow(){
    console.log("You are opening select term window")
    this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    this.departmentForm.controls.term.setValue(termData.term_name);
    this.selectedTermId = termData.id;
  }

  openTeacherWindow(){
    console.log("You are opening select teacher window")
    this.selectTeacher.openModal();
  }

  onTeacherSelected(teacherData: any){
    console.log(teacherData);

    this.departmentForm.controls.departmentHead.setValue(teacherData.first_name + " " + teacherData.last_name);
    this.selectedTeacherId = teacherData.id;
  }

}
