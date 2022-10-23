import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';


@Component({
  selector: 'app-fees-form',
  templateUrl: './fees-form.component.html',
  styleUrls: ['./fees-form.component.scss']
})
export class FeesFormComponent implements OnInit {

  constructor() { }

  // @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;

  selectedTermId = "";
  selectedTermData = {};
  
  feesForm = new FormGroup({
    feesCode: new FormControl(''),
    feesDate: new FormControl(),
    feesName: new FormControl(''),
    feesDescription: new FormControl(''),
    term: new FormControl({value: "", disabled: true}),
  })

  ngOnInit(): void {
  }

  openTermWindow(){
    console.log("You are opening select term window")
    // this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    this.feesForm.controls.term.setValue(termData.data().term_name);
    this.selectedTermId = termData.id;
    this.selectedTermData = termData.data();
  }

}
