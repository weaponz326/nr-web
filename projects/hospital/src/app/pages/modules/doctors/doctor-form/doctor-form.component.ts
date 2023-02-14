import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ImageInputComponent } from 'projects/personal/src/app/components/module-utilities/image-input/image-input.component';
import { BdayInputComponent } from 'projects/personal/src/app/components/module-utilities/bday-input/bday-input.component'


@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.scss']
})
export class DoctorFormComponent implements OnInit {

  constructor() { }

  @ViewChild('imageInputComponentReference', { read: ImageInputComponent, static: false }) photo!: ImageInputComponent;
  @ViewChild('bdayInputComponentReference', { read: BdayInputComponent, static: false }) bday!: BdayInputComponent;

  doctorForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    sex: new FormControl(''),
    nationality: new FormControl(''),
    religion: new FormControl(''),
    doctorCode: new FormControl(''),
    speciality: new FormControl(''),
    department: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    postCode: new FormControl(''),
  });

  ngOnInit(): void {
  }

}
