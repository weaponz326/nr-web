import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { WardPatientFormComponent } from '../ward-patient-form/ward-patient-form.component';
import { SelectPatientComponent } from '../../../../components/select-windows/patients-windows/select-patient/select-patient.component';

import { WardPatient } from 'projects/hospital/src/app/models/modules/wards/wards.model';


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
  @ViewChild('selectPatientComponentReference', { read: SelectPatientComponent, static: false }) selectPatient!: SelectPatientComponent;

  isSaving = false;

  ngOnInit(): void {
  }

  openModal(){
    this.addButton.nativeElement.click();
  }

  saveWardPatient(){
    let data: WardPatient = {
      ward: sessionStorage.getItem('hospital_ward_id') as string,
      patient: this.wardPatientForm.selectedPatientId,
      checkin_date: this.wardPatientForm.wardPatientForm.controls.checkinDate.value,
      checkout_date: this.wardPatientForm.wardPatientForm.controls.checkoutDate.value,
      bed_number: this.wardPatientForm.wardPatientForm.controls.bedNumber.value as string,
    }

    this.saveWardPatientEvent.emit(data);
  }

  resetForm(){
    this.wardPatientForm.wardPatientForm.controls.checkinDate.setValue('');
    this.wardPatientForm.wardPatientForm.controls.checkoutDate.setValue('');
    this.wardPatientForm.wardPatientForm.controls.bedNumber.setValue('');
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
