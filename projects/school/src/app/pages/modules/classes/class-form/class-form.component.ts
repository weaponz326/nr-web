import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';
// import { SelectDepartmentComponent } from '../../../select-windows/classes-windows/select-department/select-department.component';
// import { SelectTeacherComponent } from '../../../select-windows/teachers-windows/select-teacher/select-teacher.component';

// import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';


@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.scss']
})
export class ClassFormComponent implements OnInit {

  constructor(
    // private activeTerm: ActiveTermService
  ) { }

  // @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;
  // @ViewChild('selectDepartmentComponentReference', { read: SelectDepartmentComponent, static: false }) selectDepartment!: SelectDepartmentComponent;
  // @ViewChild('selectTeacherComponentReference', { read: SelectTeacherComponent, static: false }) selectTeacher!: SelectTeacherComponent;

  selectedTermId = "";
  selectedTermData: any = {};
  selectedDepartmentId = "";
  selectedDepartmentData: any = {};
  selectedTeacherId = "";
  selectedTeacherData: any = {};

  classForm = new FormGroup({
    classCode: new FormControl(''),
    className: new FormControl(''),
    term: new FormControl({value: "", disabled: true}),
    department: new FormControl({value: "", disabled: true}),
    classTeacher: new FormControl({value: "", disabled: true}),
    location: new FormControl(''),
  })

  ngOnInit(): void {
    this.setActiveTerm();
  }

  setActiveTerm(){
    // let activeTermData = this.activeTerm.getActiveTerm();

    // this.selectedTermId = activeTermData.id;
    // this.selectedTermData = activeTermData.data;
    // this.classForm.controls.term.setValue(activeTermData.data.term_name);
  }

  openTermWindow(){
    console.log("You are opening select term window")
    // this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    this.classForm.controls.term.setValue(termData.data().term_name);
    this.selectedTermId = termData.id;
    this.selectedTermData = termData.data();
  }

  openDepartmentWindow(){
    console.log("You are opening select term window")
    // this.selectDepartment.openModal();
  }

  onDepartmentSelected(departmentData: any){
    console.log(departmentData);

    this.classForm.controls.department.setValue(departmentData.data().department_name);
    this.selectedDepartmentId = departmentData.id;
    this.selectedDepartmentData = departmentData.data();
  }

  openTeacherWindow(){
    console.log("You are opening select term window")
    // this.selectTeacher.openModal();
  }

  onTeacherSelected(teacherData: any){
    console.log(teacherData);

    this.classForm.controls.classTeacher.setValue(teacherData.data().first_name + " "+ teacherData.data().last_name);
    this.selectedTeacherId = teacherData.id;
    this.selectedTeacherData = teacherData.data();
  }

}
