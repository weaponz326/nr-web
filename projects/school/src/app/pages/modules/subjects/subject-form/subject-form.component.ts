import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SelectTermComponent } from '../../../../components/select-windows/terms-windows/select-term/select-term.component';
import { SelectDepartmentComponent } from '../../../../components/select-windows/classes-windows/select-department/select-department.component';

// import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';


@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.scss']
})
export class SubjectFormComponent implements OnInit {

  constructor(
    // private activeTerm: ActiveTermService
  ) { }

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

  ngAfterViewInit(): void {
    this.setActiveTerm()
  }

  setActiveTerm(){
    // let activeTermData = this.activeTerm.getActiveTerm();

    // this.selectedTermId = activeTermData.id;
    // this.selectedTermData = activeTermData.data;
    // this.subjectForm.controls.term.setValue(activeTermData.data.term_name);
  }

  openTermWindow(){
    console.log("You are opening select term window")
    this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    this.selectedTermId = termData.id;

    let termObject = {
      id: this.selectedTermId,
    }
    localStorage.setItem('schoolActiveTerm', JSON.stringify(termObject));
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
