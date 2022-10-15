import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';
// import { SelectClassComponent } from '../../../select-windows/classes-windows/select-class/select-class.component';

// import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';


@Component({
  selector: 'app-timetable-form',
  templateUrl: './timetable-form.component.html',
  styleUrls: ['./timetable-form.component.scss']
})
export class TimetableFormComponent implements OnInit {

  constructor(
    // private activeTerm: ActiveTermService
  ) { }

  // @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;
  // @ViewChild('selectClassComponentReference', { read: SelectClassComponent, static: false }) selectClass!: SelectClassComponent;

  selectedTermId = "";
  selectedTermData: any = {};

  timetableForm = new FormGroup({
    timetableCode: new FormControl(''),
    timetableName: new FormControl(''),
    term: new FormControl({value: "", disabled: true}),
  })

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // let activeTerm = this.activeTerm.getActiveTerm();

    // this.timetableForm.controls.term.setValue(activeTerm.data.term_name);
    // this.selectedTermId = activeTerm.id;
    // this.selectedTermData = activeTerm.data;
  }

  openTermWindow(){
    console.log("You are opening select term window")
    // this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    this.timetableForm.controls.term.setValue(termData.data().term.term_name);
    this.selectedTermId = termData.id;
    this.selectedTermData = termData.data();
  }

}
