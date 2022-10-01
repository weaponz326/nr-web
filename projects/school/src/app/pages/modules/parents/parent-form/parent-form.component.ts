import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ImageInputComponent } from 'projects/personal/src/app/components/module-utilities/image-input/image-input.component';
// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';

// import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';


@Component({
  selector: 'app-parent-form',
  templateUrl: './parent-form.component.html',
  styleUrls: ['./parent-form.component.scss']
})
export class ParentFormComponent implements OnInit {

  constructor(
    // private activeTerm: ActiveTermService
  ) { }

  @ViewChild('imageInputComponentReference', { read: ImageInputComponent, static: false }) photo!: ImageInputComponent;
  // @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;

  selectedTermId = "";
  selectedTermData = {};

  parentForm = new FormGroup({
    parentCode: new FormControl(''),
    term: new FormControl({value: '', disabled: true}),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    sex: new FormControl(''),
    photo: new FormControl(''),
    nationality: new FormControl(''),
    religion: new FormControl(''),
    occupation: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    postCode: new FormControl(''),
  });

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.setActiveTerm()
  }

  setActiveTerm(){
    // let activeTermData = this.activeTerm.getActiveTerm();

    // this.selectedTermId = activeTermData.id;
    // this.selectedTermData = activeTermData.data;
    // this.parentForm.controls.term.setValue(activeTermData.data.term_name);
  }

  openTermWindow(){
    console.log("You are opening select term window");
    // this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    this.selectedTermId = termData.id;
    this.selectedTermData = termData.data();

    let termObject = {
      id: this.selectedTermId,
      data: this.selectedTermData,
    }
    localStorage.setItem('schoolActiveTerm', JSON.stringify(termObject));
  }

}
