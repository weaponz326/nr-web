import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SelectTermComponent } from '../../../../components/select-windows/terms-windows/select-term/select-term.component';
import { SelectClaseComponent } from '../../../../components/select-windows/classes-windows/select-clase/select-clase.component';


@Component({
  selector: 'app-timetable-form',
  templateUrl: './timetable-form.component.html',
  styleUrls: ['./timetable-form.component.scss']
})
export class TimetableFormComponent implements OnInit {

  constructor() { }

  @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;
  @ViewChild('selectClassComponentReference', { read: SelectClaseComponent, static: false }) selectClass!: SelectClaseComponent;

  selectedTermId = "";

  timetableForm = new FormGroup({
    timetableCode: new FormControl(''),
    timetableName: new FormControl(''),
    term: new FormControl({value: "", disabled: true}),
  })

  ngOnInit(): void {
  }

  openTermWindow(){
    console.log("You are opening select term window")
    this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    this.timetableForm.controls.term.setValue(termData.data().term.term_name);
    this.selectedTermId = termData.id;
  }

}
