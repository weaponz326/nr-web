import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { Appointment } from 'projects/restaurant/src/app/models/modules/kitchen-stock/kitchen-stock.model';


@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.scss']
})
export class EditAppointmentComponent implements OnInit {

  constructor(private customCookie: CustomCookieService) { }

  @Output() saveAppointmentEvent = new EventEmitter<any>();
  @Output() deleteAppointmentEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('appointmentFormComponentReference', { read: AppointmentFormComponent, static: false }) appointmentForm!: AppointmentFormComponent;

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
    this.appointmentForm.appointmentForm.controls.patientName.setValue(data.patent?.first_name + " " + data.patent?.last_name);
    this.appointmentForm.appointmentForm.controls.patientNumber.setValue(data.patient?.clinical_number);
    this.appointmentForm.appointmentForm.controls.consultantName.setValue(data.consultant_name);
    this.appointmentForm.appointmentForm.controls.appointmentDate.setValue(new Date(data.appointment_date).toISOString().slice(0, 16));
    this.appointmentForm.appointmentForm.controls.appointmentStatus.setValue(data.appointment_status);
    this.appointmentForm.appointmentForm.controls.remarks.setValue(data.remarks);

    this.editButton.nativeElement.click();
  }

  saveAppointment(){
    // let data: Appointment = {
    let data = {
      account: this.customCookie.getCookie('hospital_id') as string,
      appointment_code: this.appointmentForm.appointmentForm.controls.appointmentCode.value as string,
      patient_name: this.appointmentForm.appointmentForm.controls.patientName.value as string,
      patient_number: this.appointmentForm.appointmentForm.controls.patientNumber.value as string,
      consultant_name: this.appointmentForm.appointmentForm.controls.consultantName.value as string,
      appointment_date: this.appointmentForm.appointmentForm.controls.appointmentDate.value as number,
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

}
