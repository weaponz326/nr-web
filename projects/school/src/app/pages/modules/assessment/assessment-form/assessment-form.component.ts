import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SelectTermComponent } from '../../../../components/select-windows/terms-windows/select-term/select-term.component';
import { SelectSubjectComponent } from '../../../../components/select-windows/subjects-windows/select-subject/select-subject.component';
import { SelectClaseComponent } from '../../../../components/select-windows/classes-windows/select-clase/select-clase.component';


@Component({
  selector: 'app-assessment-form',
  templateUrl: './assessment-form.component.html',
  styleUrls: ['./assessment-form.component.scss']
})
export class AssessmentFormComponent implements OnInit {

  constructor() { }

  @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;
  @ViewChild('selectSubjectComponentReference', { read: SelectSubjectComponent, static: false }) selectSubject!: SelectSubjectComponent;
  @ViewChild('selectClassComponentReference', { read: SelectClaseComponent, static: false }) selectClass!: SelectClaseComponent;

  selectedTermId = "";
  selectedSubjectId = "";
  selectedClassId = "";

  assessmentForm = new FormGroup({
    assessmentCode: new FormControl(''),
    assessmentDate: new FormControl(),
    assessmentName: new FormControl(''),
    term: new FormControl({value: "", disabled: true}),
    subject: new FormControl({value: "", disabled: true}),
    clase: new FormControl({value: "", disabled: true}),
  })

  ngOnInit(): void {
  }

  openTermWindow(){
    console.log("You are opening select term window");
    this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    this.assessmentForm.controls.term.setValue(termData.term_name);
    this.selectedTermId = termData.id;
  }

  openSubjectWindow(){
    console.log("You are opening select term window")
    this.selectSubject.openModal();
  }

  onSubjectSelected(subjectData: any){
    console.log(subjectData);

    this.assessmentForm.controls.subject.setValue(subjectData.subject_name);
    this.selectedSubjectId = subjectData.id;
  }

  openClassWindow(){
    console.log("You are opening select term window")
    this.selectClass.openModal();
  }

  onClassSelected(classData: any){
    console.log(classData);

    this.assessmentForm.controls.clase.setValue(classData.class_name);
    this.selectedClassId = classData.id;
  }

}
