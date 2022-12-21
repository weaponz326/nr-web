import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ImageInputComponent } from 'projects/personal/src/app/components/module-utilities/image-input/image-input.component';
import { SelectTermComponent } from '../../../../components/select-windows/terms-windows/select-term/select-term.component';


@Component({
  selector: 'app-parent-form',
  templateUrl: './parent-form.component.html',
  styleUrls: ['./parent-form.component.scss']
})
export class ParentFormComponent implements OnInit {

  constructor() { }

  @ViewChild('imageInputComponentReference', { read: ImageInputComponent, static: false }) photo!: ImageInputComponent;
  @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;

  selectedTermId = "";

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

  openTermWindow(){
    console.log("You are opening select term window");
    this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    this.selectedTermId = termData.id;
    this.parentForm.controls.term.setValue(termData.term_name);
  }

}
