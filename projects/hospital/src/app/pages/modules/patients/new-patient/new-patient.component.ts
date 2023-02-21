import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { PatientFormComponent } from '../patient-form/patient-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { PatientsApiService } from 'projects/hospital/src/app/services/modules-api/patients-api/patients-api.service';

// import { Patient } from 'projects/hospital/src/app/models/modules/patients/patients.model';


@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss']
})
export class NewPatientComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private patientsApi: PatientsApiService,
  ) { }

  @ViewChild('patientFormComponentReference', { read: PatientFormComponent, static: false }) patientForm!: PatientFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Patient", url: "/home/patients/new-patient" },
  ];

  storageBasePath = "/hospital/" + this.customCookie.getCookie('hospital_id') + "/module_patients/";

  isPatientSaving = false;

  ngOnInit(): void {
    this.getNewPatientCodeConfig();
  }

  postPatient(){
    console.log('u are saving a new patient');

    var data = {
      account: this.customCookie.getCookie('hospital_id') as string,
      first_name: this.patientForm.patientForm.controls.firstName.value as string,
      last_name: this.patientForm.patientForm.controls.lastName.value as string,
      sex: this.patientForm.patientForm.controls.sex.value as string,
      date_of_birth: this.patientForm.bday.getValue(),
      clinical_number: this.patientForm.patientForm.controls.clinicalNumber.value as string,
      insurance_type: this.patientForm.patientForm.controls.insuranceType.value as string,
      insurance_number: this.patientForm.patientForm.controls.insuranceNumber.value as string,
      nationality: this.patientForm.patientForm.controls.nationality.value as string,
      religion: this.patientForm.patientForm.controls.religion.value as string,
      phone: this.patientForm.patientForm.controls.phone.value as string,
      email: this.patientForm.patientForm.controls.email.value as string,
      address: this.patientForm.patientForm.controls.address.value as string,
      state: this.patientForm.patientForm.controls.state.value as string,
      city: this.patientForm.patientForm.controls.city.value as string,
      post_code: this.patientForm.patientForm.controls.postCode.value as string,
    }

    console.log(data);
    this.isPatientSaving = true;

    this.patientsApi.postPatient(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          sessionStorage.setItem('hospital_patient_id', res.id);

          if(this.patientForm.photo.isImageChanged){
            this.putPatientImage();
          }
          else{
            this.router.navigateByUrl('/home/patients/view-patient');                    
          }
        },
        error: (err) => {
          console.log(err);
          this.isPatientSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  putPatientImage(){
    this.patientsApi.putPatientPhoto(this.patientForm.photo.image)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/patients/view-patient');                    
        },
        error: (err) => {
          console.log(err);          
          this.connectionToast.openToast();
        }
      })
  }

  getNewPatientCodeConfig(){
    this.patientsApi.getNewPatientCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.patientForm.patientForm.controls.clinicalNumber.disable();

          if(res.code)
            this.patientForm.patientForm.controls.clinicalNumber.setValue(res.code);
          else
            this.patientForm.patientForm.controls.clinicalNumber.enable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
