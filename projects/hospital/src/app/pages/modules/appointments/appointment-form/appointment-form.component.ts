import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {

  constructor() { }

  @Output() openPatientWindow = new EventEmitter<any>();

  selectedPatientId = '';

  appointmentForm = new FormGroup({
    appointmentCode: new FormControl(''),
    patientName: new FormControl({value: '', disabled: true}),
    patientNumber: new FormControl({value: '', disabled: true}),
    consultantName: new FormControl(''),
    appointmentDate: new FormControl(),
    remarks: new FormControl(''),
    appointmentStatus: new FormControl(''),
  })
  
  ngOnInit(): void {
  }

}
