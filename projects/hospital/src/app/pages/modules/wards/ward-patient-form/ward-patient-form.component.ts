import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-ward-patient-form',
  templateUrl: './ward-patient-form.component.html',
  styleUrls: ['./ward-patient-form.component.scss']
})
export class WardPatientFormComponent implements OnInit {

  constructor() { }

  wardPatientForm = new FormGroup({
    patientNumber: new FormControl(''),
    patientName: new FormControl(''),
    checkinDate: new FormControl(),
    checkoutDate: new FormControl(),
    bedNumber: new FormControl('')
  })

  ngOnInit(): void {
  }

}
