import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';
// import { SelectClassComponent } from '../../../select-windows/classes-windows/select-class/select-class.component';

// import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';


@Component({
  selector: 'app-attendance-form',
  templateUrl: './attendance-form.component.html',
  styleUrls: ['./attendance-form.component.scss']
})
export class AttendanceFormComponent implements OnInit {

  constructor(
    // private activeTerm: ActiveTermService
  ) { }

  @Input() isDateDisabled: boolean = false;
  @Input() isClassDisabled: boolean = false;

  // @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;
  // @ViewChild('selectClassComponentReference', { read: SelectClassComponent, static: false }) selectClass!: SelectClassComponent;

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

  ngAfterViewInit(): void {
    // let activeTerm = this.activeTerm.getActiveTerm()

    // this.attendanceForm.controls.term.setValue(activeTerm.data.term_name);
    // this.selectedTermId = activeTerm.id;
    // this.selectedTermData = activeTerm.data;
  }

  openTermWindow(){
    console.log("You are opening select term window")
    // this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    this.attendanceForm.controls.term.setValue(termData.data().term_name);
    this.selectedTermId = termData.id;
  }

  openClassWindow(){
    console.log("You are opening select term window")
    // this.selectClass.openModal();
  }

  onClassSelected(classData: any){
    console.log(classData);

    this.attendanceForm.controls.clase.setValue(classData.data().class_name);
    this.selectedClassId = classData.id;
  }

}
