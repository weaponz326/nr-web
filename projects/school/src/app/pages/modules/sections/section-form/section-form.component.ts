import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';
// import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';


@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.scss']
})
export class SectionFormComponent implements OnInit {

  constructor(
    // private activeTerm: ActiveTermService
  ) { }

  // @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;

  selectedTermId = "";
  selectedTermData: any = {};

  sectionForm = new FormGroup({
    sectionCode: new FormControl(''),
    sectionName: new FormControl(''),
    term: new FormControl({value: "", disabled: true}),
  })

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // let activeTerm = this.activeTerm.getActiveTerm();
    // this.sectionForm.controls.term.setValue(activeTerm.data.term_name);
    // this.selectedTermId = activeTerm.id;
    // this.selectedTermData = activeTerm.data;
  }

  openTermWindow(){
    console.log("You are opening select term window")
    // this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    this.sectionForm.controls.term.setValue(termData.data().term.term_name);
    this.selectedTermId = termData.id;
    this.selectedTermData = termData.data();
  }

}
