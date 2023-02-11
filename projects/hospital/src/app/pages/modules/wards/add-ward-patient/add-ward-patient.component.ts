import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { WardPatientFormComponent } from '../ward-patient-form/ward-patient-form.component';
// import { WardPatient } from 'projects/hospital/src/app/models/modules/ward/ward.model';


@Component({
  selector: 'app-add-ward-patient',
  templateUrl: './add-ward-patient.component.html',
  styleUrls: ['./add-ward-patient.component.scss']
})
export class AddWardPatientComponent implements OnInit {

  constructor() { }

  @Output() saveWardPatientEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('wardPatientFormComponentReference', { read: WardPatientFormComponent, static: false }) wardPatientForm!: WardPatientFormComponent;

  isSaving = false;

  ngOnInit(): void {
  }

  openModal(){
    this.addButton.nativeElement.click();
  }

  saveWardPatient(){
    // let data: WardPatient = {
    let data = {
      checkin_date: this.wardPatientForm.wardPatientForm.controls.checkinDate.value,
      checkout_date: this.wardPatientForm.wardPatientForm.controls.checkoutDate.value,
      bed_number: this.wardPatientForm.wardPatientForm.controls.bedNumber.value as string,
      ward: sessionStorage.getItem('hospital_ward_id') as string,
    }

    this.saveWardPatientEvent.emit(data);
  }

  resetForm(){
    this.wardPatientForm.wardPatientForm.controls.checkinDate.setValue('');
    this.wardPatientForm.wardPatientForm.controls.checkoutDate.setValue('');
    this.wardPatientForm.wardPatientForm.controls.bedNumber.setValue('');
  }

}
