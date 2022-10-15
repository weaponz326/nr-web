import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ImageInputComponent } from 'projects/personal/src/app/components/module-utilities/image-input/image-input.component';
import { BdayInputComponent } from 'projects/personal/src/app/components/module-utilities/bday-input/bday-input.component'
// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';
// import { SelectDepartmentComponent } from '../../../select-windows/classes-windows/select-department/select-department.component';

// import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';


@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.scss']
})
export class TeacherFormComponent implements OnInit {

  constructor(
    // private activeTerm: ActiveTermService
  ) { }

  @ViewChild('imageInputComponentReference', { read: ImageInputComponent, static: false }) photo!: ImageInputComponent;
  @ViewChild('bdayInputComponentReference', { read: BdayInputComponent, static: false }) bday!: BdayInputComponent;

  // @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;
  // @ViewChild('selectDepartmentComponentReference', { read: SelectDepartmentComponent, static: false }) selectDepartment!: SelectDepartmentComponent;

  selectedTermId = "";
  selectedTermData: any = {};
  selectedDepartmentId = "";
  selectedDepartmentData: any = { department_code: "", department_name: "" };

  teacherForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    sex: new FormControl(''),
    nationality: new FormControl(''),
    religion: new FormControl(''),
    teacherCode: new FormControl(''),
    term: new FormControl({value: '', disabled: true}),
    department: new FormControl(''),
    grade: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    postCode: new FormControl(''),
  });

  ngOnInit(): void {
    // this.initParentForm();
  }

  ngAfterViewInit(){
    this.setActiveTerm()
  }

  setActiveTerm(){
    // let activeTermData = this.activeTerm.getActiveTerm();

    // this.selectedTermId = activeTermData.id;
    // this.selectedTermData = activeTermData.data;
    // this.teacherForm.controls.term.setValue(activeTermData.data.term_name);
  }

  openTermWindow(){
    console.log("You are opening select term window")
    // this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    this.teacherForm.controls.term.setValue(termData.data().term_name);
    this.selectedTermId = termData.id;
    this.selectedTermData = termData.data();
  }

  openDepartmentWindow(){
    console.log("You are opening select term window")
    // this.selectDepartment.openModal();
  }

  onDepartmentSelected(classData: any){
    console.log(classData);

    // this.teacherForm.controls.class.setValue(classData.data().department_name);
    this.selectedDepartmentId = classData.id;
    this.selectedDepartmentData = classData.data();
  }

}
