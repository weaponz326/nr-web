import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { BdayInputComponent } from 'projects/personal/src/app/components/module-utilities/bday-input/bday-input.component';


@Component({
  selector: 'app-additional',
  templateUrl: './additional.component.html',
  styleUrls: ['./additional.component.scss']
})
export class AdditionalComponent implements OnInit {

  constructor() { }

  @Output() updateExtendedEvent = new EventEmitter<any>;

  @ViewChild('bdayInputComponentReference', { read: BdayInputComponent, static: false }) bdayInput!: BdayInputComponent;

  isExtendedProfileLoading = false;
  isExtendedProfileSaving = false;

  additionalForm = new FormGroup({
    gender: new FormControl(),
  })

  ngOnInit(): void {
  }

  updateAdditional(){
    let data = {
      date_of_birth: this.bdayInput.getValue(),
      gender: this.additionalForm.controls.gender.value,
    }

    this.updateExtendedEvent.emit(data);
  }

}
