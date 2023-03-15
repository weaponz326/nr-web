import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { SelectPatientComponent } from '../../../../components/select-windows/patients-windows/select-patient/select-patient.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AppointmentsApiService } from 'projects/hospital/src/app/services/modules-api/appointments-api/appointments-api.service';

import { Appointment } from 'projects/hospital/src/app/models/modules/appointments/appointments.model';


@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.scss']
})
export class EditAppointmentComponent implements OnInit {

  constructor(
    private customCookie: CustomCookieService,
    private appointmentsApi: AppointmentsApiService
  ) { }

  @Output() saveAppointmentEvent = new EventEmitter<any>();
  @Output() deleteAppointmentEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('appointmentFormComponentReference', { read: AppointmentFormComponent, static: false }) appointmentForm!: AppointmentFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('selectPatientComponentReference', { read: SelectPatientComponent, static: false }) selectPatient!: SelectPatientComponent;

  navHeading: any[] = [
    { text: "All Appointments", url: "/home/kitchen-stock/all-appointments" },
    { text: "View Appointment", url: "/home/kitchen-stock/view-appointment" },
  ];

  appointmentData: any;

  isAppointmentSaving = false;
  isAppointmentDeleting = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.appointmentData = data;

    this.appointmentForm.appointmentForm.controls.appointmentCode.setValue(data.appointment_code);
    this.appointmentForm.appointmentForm.controls.consultantName.setValue(data.consultant_name);
    this.appointmentForm.appointmentForm.controls.appointmentDate.setValue(new Date(data.appointment_date).toISOString().slice(0, 16));
    this.appointmentForm.appointmentForm.controls.appointmentStatus.setValue(data.appointment_status);
    this.appointmentForm.appointmentForm.controls.remarks.setValue(data.remarks);

    this.appointmentForm.selectedPatientId = data.patient?.id;
    this.appointmentForm.appointmentForm.controls.patientName.setValue(data.patient?.first_name + " " + data.patient?.last_name);
    this.appointmentForm.appointmentForm.controls.patientNumber.setValue(data.patient?.clinical_number);

    this.editButton.nativeElement.click();

    this.getAppointmentCodeConfig();
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

    let appointment = {
      id: this.appointmentData.id,
      data: data
    }

    this.saveAppointmentEvent.emit(appointment);
  }

  deleteAppointment(){
    this.deleteAppointmentEvent.emit(this.appointmentData.id);
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

  getAppointmentCodeConfig(){
    this.appointmentsApi.getAppointmentCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.entry_mode == "Auto")
            this.appointmentForm.appointmentForm.controls.appointmentCode.disable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
