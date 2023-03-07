import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { WardPatientFormComponent } from '../ward-patient-form/ward-patient-form.component';
import { SelectPatientComponent } from '../../../../components/select-windows/patients-windows/select-patient/select-patient.component';

import { WardPatient } from 'projects/hospital/src/app/models/modules/wards/wards.model';


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
  @ViewChild('selectPatientComponentReference', { read: SelectPatientComponent, static: false }) selectPatient!: SelectPatientComponent;

  wardPatientFormData: any;

  isSaving = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.wardPatientFormData = data;

    this.wardPatientForm.wardPatientForm.controls.checkinDate.setValue(new Date(this.wardPatientFormData.checkin_date).toISOString().slice(0, 10));
    if(data.checkout_date != null) this.wardPatientForm.wardPatientForm.controls.checkoutDate.setValue(new Date(this.wardPatientFormData.checkout_date).toISOString().slice(0, 10));
    this.wardPatientForm.wardPatientForm.controls.bedNumber.setValue(this.wardPatientFormData.bed_number);

    this.wardPatientForm.selectedPatientId = this.wardPatientFormData.patient?.id;
    this.wardPatientForm.wardPatientForm.controls.patientNumber.setValue(this.wardPatientFormData.patient?.clinical_number);
    this.wardPatientForm.wardPatientForm.controls.patientName.setValue(this.wardPatientFormData.patient?.first_name + " " + this.wardPatientFormData.patient?.last_name);

    this.editButton.nativeElement.click();
  }

  saveWardPatient(){
    let data: WardPatient = {
      ward: sessionStorage.getItem('hospital_ward_id') as string,
      patient: this.wardPatientForm.selectedPatientId,
      checkin_date: this.wardPatientForm.wardPatientForm.controls.checkinDate.value,
      checkout_date: this.wardPatientForm.wardPatientForm.controls.checkoutDate.value,
      bed_number: this.wardPatientForm.wardPatientForm.controls.bedNumber.value as string,
    }

    let wardPatient = {
      id: this.wardPatientFormData.id,
      data: data
    }

    this.saveWardPatientEvent.emit(wardPatient);
  }

  openPatientWindow(){
    console.log("You are opening select patient window")
    this.selectPatient.openModal();
  }

  onPatientSelected(patientData: any){
    console.log(patientData);

    this.wardPatientForm.selectedPatientId = patientData.id;
    this.wardPatientForm.wardPatientForm.controls.patientName.setValue(patientData.first_name + " " + patientData.last_name);
    this.wardPatientForm.wardPatientForm.controls.patientNumber.setValue(patientData.clinical_number);
  }

}
