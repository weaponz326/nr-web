import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {

  constructor() { }

  appointmentForm = new FormGroup({
    appointmentCode: new FormControl(''),
    patientName: new FormControl(''),
    patientNumber: new FormControl(''),
    consultantName: new FormControl(''),
    appointmentDate: new FormControl(),
    remarks: new FormControl(''),
    appointmentStatus: new FormControl(''),
  })
  
  ngOnInit(): void {
  }

}
