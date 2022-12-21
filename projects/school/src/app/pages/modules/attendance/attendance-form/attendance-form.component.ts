import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SelectTermComponent } from '../../../../components/select-windows/terms-windows/select-term/select-term.component';
import { SelectClaseComponent } from '../../../../components/select-windows/classes-windows/select-clase/select-clase.component';


@Component({
  selector: 'app-attendance-form',
  templateUrl: './attendance-form.component.html',
  styleUrls: ['./attendance-form.component.scss']
})
export class AttendanceFormComponent implements OnInit {

  constructor() { }

  @Input() isDateDisabled: boolean = false;
  @Input() isClassDisabled: boolean = false;

  @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;
  @ViewChild('selectClassComponentReference', { read: SelectClaseComponent, static: false }) selectClass!: SelectClaseComponent;

  attendanceFormData: any;

  selectedTermId = "";
  selectedClassId = "";

  attendanceForm = new FormGroup({
    attendanceCode: new FormControl(''),
    attendanceName: new FormControl(''),
    fromDate: new FormControl({value: "", disabled: this.isDateDisabled}),
    toDate: new FormControl({value: "", disabled: this.isDateDisabled}),
    term: new FormControl({value: "", disabled: true}),
    attendanceSource: new FormControl('Students'),
    clase: new FormControl({value: "", disabled: true}),
  })

  ngOnInit(): void {
  }

  openTermWindow(){
    console.log("You are opening select term window")
    this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    this.attendanceForm.controls.term.setValue(termData.term_name);
    this.selectedTermId = termData.id;
  }

  openClassWindow(){
    console.log("You are opening select term window")
    this.selectClass.openModal();
  }

  onClassSelected(classData: any){
    console.log(classData);

    this.attendanceForm.controls.clase.setValue(classData.class_name);
    this.selectedClassId = classData.id;
  }

}
