import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { WardPatientFormComponent } from '../ward-patient-form/ward-patient-form.component';
// import { WardPatient } from 'projects/personal/src/app/models/modules/accounts/accounts.model';


@Component({
  selector: 'app-edit-ward-patient',
  templateUrl: './edit-ward-patient.component.html',
  styleUrls: ['./edit-ward-patient.component.scss']
})
export class EditWardPatientComponent implements OnInit {

  constructor() { }

  @Output() saveWardPatientEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('wardPatientFormComponentReference', { read: WardPatientFormComponent, static: false }) wardPatientForm!: WardPatientFormComponent;

  wardPatientFormData: any;

  isSaving = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.wardPatientFormData = data;

    this.wardPatientForm.wardPatientForm.controls.checkinDate.setValue(new Date(this.wardPatientFormData.checkin_date).toISOString().slice(0, 10));
    this.wardPatientForm.wardPatientForm.controls.checkoutDate.setValue(new Date(this.wardPatientFormData.checkout_date).toISOString().slice(0, 10));
    this.wardPatientForm.wardPatientForm.controls.bedNumber.setValue(this.wardPatientFormData.bed_number);

    this.editButton.nativeElement.click();
  }

  saveWardPatient(){
    // let data: WardPatient = {
    let data = {
      checkin_date: this.wardPatientForm.wardPatientForm.controls.checkinDate.value,
      checkout_date: this.wardPatientForm.wardPatientForm.controls.checkoutDate.value,
      bed_number: this.wardPatientForm.wardPatientForm.controls.bedNumber.value as string,
      ward: sessionStorage.getItem('hospital_ward_id') as string,
    }

    let wardPatient = {
      id: this.wardPatientFormData.id,
      data: data
    }

    this.saveWardPatientEvent.emit(wardPatient);
  }

}
