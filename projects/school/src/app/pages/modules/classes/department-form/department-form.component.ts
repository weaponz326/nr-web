import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';
// import { SelectTeacherComponent } from '../../../select-windows/teachers-windows/select-teacher/select-teacher.component';


@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent implements OnInit {

  constructor() { }

  // @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;
  // @ViewChild('selectTeacherComponentReference', { read: SelectTeacherComponent, static: false }) selectTeacher!: SelectTeacherComponent;

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
    // this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    this.departmentForm.controls.term.setValue(termData.data().term.term_name);
    this.selectedTermId = termData.id;
    this.selectedTermData = termData.data();
  }

  openTeacherWindow(){
    console.log("You are opening select teacher window")
    // this.selectTeacher.openModal();
  }

  onTeacherSelected(teacherData: any){
    console.log(teacherData);

    this.departmentForm.controls.departmentHead.setValue(teacherData.data().first_name + " " + teacherData.data().last_name);
    this.selectedTeacherId = teacherData.id;
    this.selectedTeacherData = teacherData.data();
  }

}
