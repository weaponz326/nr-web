import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { AppointmentApiService } from 'projects/hospital/src/app/services/modules-api/kitchen-stock-api/kitchen-stock-api.service';

// import { Appointment } from 'projects/hospital/src/app/models/modules/kitchen-stock/kitchen-stock.model';


@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit {

  constructor(
    private customCookie: CustomCookieService,
    // private appointmentApi: AppointmentApiService
  ) { }

  @Output() saveAppointmentEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('appointmentFormComponentReference', { read: AppointmentFormComponent, static: false }) appointmentForm!: AppointmentFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isAppointmentSaving = false;

  ngOnInit(): void {
  }

  getNewAppointmentCodeConfig(){
    // this.appointmentForm.appointmentForm.controls.appointmentCode.disable();

    // this.appointmentApi.getNewAppointmentCodeConfig()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       if(res.code)
    //         this.appointmentForm.appointmentForm.controls.appointmentCode.setValue(res.code);
    //       else
    //         this.appointmentForm.appointmentForm.controls.appointmentCode.enable();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }
  
  openModal(){
    this.addButton.nativeElement.click();
    this.getNewAppointmentCodeConfig();
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

}
