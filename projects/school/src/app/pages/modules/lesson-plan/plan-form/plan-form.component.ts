import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SelectTermComponent } from '../../../../components/select-windows/terms-windows/select-term/select-term.component';
import { SelectSubjectComponent } from '../../../../components/select-windows/subjects-windows/select-subject/select-subject.component';
import { SelectTeacherComponent } from '../../../../components/select-windows/teachers-windows/select-teacher/select-teacher.component';


@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.scss']
})
export class PlanFormComponent implements OnInit {

  constructor() { }

  @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;
  @ViewChild('selectSubjectComponentReference', { read: SelectSubjectComponent, static: false }) selectSubject!: SelectSubjectComponent;
  @ViewChild('selectTeacherComponentReference', { read: SelectTeacherComponent, static: false }) selectTeacher!: SelectTeacherComponent;

  selectedTermId = "";
  selectedSubjectId = "";
  selectedTeacherId = "";

  isPlanSaving = false;

  planForm = new FormGroup({
    planCode: new FormControl(''),
    planDate: new FormControl(),
    planName: new FormControl(''),
    term: new FormControl({value: "", disabled: true}),
    subject: new FormControl({value: "", disabled: true}),
    teacher: new FormControl({value: "", disabled: true}),
  })

  ngOnInit(): void {
  }

  openTermWindow(){
    console.log("You are opening select term window")
    this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    this.planForm.controls.term.setValue(termData.term_name);
    this.selectedTermId = termData.id;
  }

  openSubjectWindow(){
    console.log("You are opening select subject window")
    this.selectSubject.openModal();
  }

  onSubjectSelected(subjectData: any){
    console.log(subjectData);

    this.planForm.controls.subject.setValue(subjectData.subject_name);
    this.selectedSubjectId = subjectData.id;
  }

  openTeacherWindow(){
    console.log("You are opening select teacher window")
    this.selectTeacher.openModal();
  }

  onTeacherSelected(teacherData: any){
    console.log(teacherData);

    this.planForm.controls.teacher.setValue(teacherData.first_name + " " + teacherData.last_name);
    this.selectedTeacherId = teacherData.id;
  }

}
