import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { SelectPatientComponent } from '../../../../components/select-windows/patients-windows/select-patient/select-patient.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AppointmentsApiService } from 'projects/hospital/src/app/services/modules-api/appointments-api/appointments-api.service';

import { Appointment } from 'projects/hospital/src/app/models/modules/appointments/appointments.model';


@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit {

  constructor(
    private customCookie: CustomCookieService,
    private appointmentsApi: AppointmentsApiService
  ) { }

  @Output() saveAppointmentEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('appointmentFormComponentReference', { read: AppointmentFormComponent, static: false }) appointmentForm!: AppointmentFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('selectPatientComponentReference', { read: SelectPatientComponent, static: false }) selectPatient!: SelectPatientComponent;

  isAppointmentSaving = false;

  ngOnInit(): void {
  }

  openModal(){
    this.addButton.nativeElement.click();
    this.appointmentForm.appointmentForm.controls.appointmentDate.setValue(new Date().toISOString().slice(0, 16))
    this.getNewAppointmentCodeConfig();
  }

  saveAppointment(){
    let data: Appointment = {
      account: this.customCookie.getCookie('hospital_id') as string,
      patient: this.appointmentForm.selectedPatientId,
      appointment_code: this.appointmentForm.appointmentForm.controls.appointmentCode.value as string,
      consultant_name: this.appointmentForm.appointmentForm.controls.consultantName.value as string,
      appointment_date: this.appointmentForm.appointmentForm.controls.appointmentDate.value,
      appointment_status: this.appointmentForm.appointmentForm.controls.appointmentStatus.value as string,
      remarks: this.appointmentForm.appointmentForm.controls.remarks.value as string,
    }

    this.saveAppointmentEvent.emit(data);
  }

  resetForm(){
    this.appointmentForm.appointmentForm.controls.appointmentCode.setValue('');
    this.appointmentForm.appointmentForm.controls.patientName.setValue('');
    this.appointmentForm.appointmentForm.controls.patientNumber.setValue('');
    this.appointmentForm.appointmentForm.controls.consultantName.setValue('');
    this.appointmentForm.appointmentForm.controls.appointmentDate.setValue('');
    this.appointmentForm.appointmentForm.controls.appointmentStatus.setValue('');
    this.appointmentForm.appointmentForm.controls.remarks.setValue('');
  }

  openPatientWindow(){
    console.log("You are opening select patient window")
    this.selectPatient.openModal();
  }

  onPatientSelected(patientData: any){
    console.log(patientData);

    this.appointmentForm.selectedPatientId = patientData.id;
    this.appointmentForm.appointmentForm.controls.patientName.setValue(patientData.first_name + " " + patientData.last_name);
    this.appointmentForm.appointmentForm.controls.patientNumber.setValue(patientData.clinical_number);
  }

  getNewAppointmentCodeConfig(){
    this.appointmentsApi.getNewAppointmentCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.code){
            this.appointmentForm.appointmentForm.controls.appointmentCode.setValue(res.code);
            this.appointmentForm.appointmentForm.controls.appointmentCode.disable();
          }
          else{
            this.appointmentForm.appointmentForm.controls.appointmentCode.enable();
          }
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
