import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-ward-patient-form',
  templateUrl: './ward-patient-form.component.html',
  styleUrls: ['./ward-patient-form.component.scss']
})
export class WardPatientFormComponent implements OnInit {

  constructor() { }

  @Output() openPatientWindow = new EventEmitter<any>();

  selectedPatientId = '';

  wardPatientForm = new FormGroup({
    patientNumber: new FormControl({value: '', disabled: true}),
    patientName: new FormControl({value: '', disabled: true}),
    checkinDate: new FormControl(),
    checkoutDate: new FormControl(),
    bedNumber: new FormControl('')
  })

  ngOnInit(): void {
  }

}
