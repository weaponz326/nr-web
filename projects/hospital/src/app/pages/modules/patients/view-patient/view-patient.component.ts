import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { PatientFormComponent } from '../patient-form/patient-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { environment } from 'projects/hospital/src/environments/environment';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { PatientsApiService } from 'projects/hospital/src/app/services/modules-api/patients-api/patients-api.service';
// import { PatientsPrintService } from 'projects/hospital/src/app/services/printing/patients-print/patients-print.service';

// import { Patient } from 'projects/hospital/src/app/models/modules/patients/patients.model';


@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.scss']
})
export class ViewPatientComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    // private patientsApi: PatientsApiService,
    // private patientsPrint: PatientsPrintService,
  ) { }

  @ViewChild('patientFormComponentReference', { read: PatientFormComponent, static: false }) patientForm!: PatientFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Patients", url: "/home/patients/all-patients" },
    { text: "View Patient", url: "/home/patients/view-patient" },
  ];

  patientData: any;

  isPatientLoading = false;
  isPatientSaving = false;
  isPatientDeleting = false;

  ngOnInit(): void {
    this.getPatient();
  }

  getPatient(){
    this.isPatientLoading = true;

    // this.patientsApi.getPatient()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.patientData = res;
    //       this.isPatientLoading = false;

    //       this.patientForm.patientForm.controls.firstName.setValue(this.patientData.first_name);
    //       this.patientForm.patientForm.controls.lastName.setValue(this.patientData.last_name);
    //       this.patientForm.patientForm.controls.sex.setValue(this.patientData.sex);
    //       this.patientForm.patientForm.controls.clinicalNumber.setValue(this.patientData.clinical_number);
    //       this.patientForm.patientForm.controls.insuranceType.setValue(this.patientData.insurance_type);
    //       this.patientForm.patientForm.controls.insuranceNumber.setValue(this.patientData.insurance_number);
    //       this.patientForm.patientForm.controls.nationality.setValue(this.patientData.nationality);
    //       this.patientForm.patientForm.controls.religion.setValue(this.patientData.religion);
    //       this.patientForm.patientForm.controls.phone.setValue(this.patientData.phone);
    //       this.patientForm.patientForm.controls.email.setValue(this.patientData.email);
    //       this.patientForm.patientForm.controls.address.setValue(this.patientData.address);
    //       this.patientForm.patientForm.controls.state.setValue(this.patientData.state);
    //       this.patientForm.patientForm.controls.city.setValue(this.patientData.city);
    //       this.patientForm.patientForm.controls.postCode.setValue(this.patientData.post_code);

    //       if (this.patientData.photo != null)
    //         this.patientForm.photo.imgSrc = environment.apiUrl.slice(0, -1) + this.patientData.photo;
    //       else
    //         this.patientForm.photo.imgSrc = 'assets/images/utilities/photo-avatar.jpg';
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isPatientLoading = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  putPatient(){
    console.log('u are saving a new patient');

    var data = {
      account: this.customCookie.getCookie('hospital_id') as string,
      first_name: this.patientForm.patientForm.controls.firstName.value,
      last_name: this.patientForm.patientForm.controls.lastName.value,
      sex: this.patientForm.patientForm.controls.sex.value,
      date_of_birth: this.patientForm.bday.getValue(),
      clinical_number: this.patientForm.patientForm.controls.clinicalNumber.value,
      insurance_type: this.patientForm.patientForm.controls.insuranceType.value,
      insurance_number: this.patientForm.patientForm.controls.insuranceNumber.value,
      nationality: this.patientForm.patientForm.controls.nationality.value,
      religion: this.patientForm.patientForm.controls.religion.value,
      phone: this.patientForm.patientForm.controls.phone.value,
      email: this.patientForm.patientForm.controls.email.value,
      address: this.patientForm.patientForm.controls.address.value,
      state: this.patientForm.patientForm.controls.state.value,
      city: this.patientForm.patientForm.controls.city.value,
      post_code: this.patientForm.patientForm.controls.postCode.value,
    }

    console.log(data);
    this.isPatientSaving = true;

    // this.patientsApi.putPatient(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       if(this.patientForm.photo.isImageChanged){
    //         this.putPatientImage();
    //       }
    //       else{
    //         this.isPatientSaving = false;
    //       }
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isPatientSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deletePatient(){
    this.isPatientDeleting = true;

    // this.patientsApi.deletePatient()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.isPatientDeleting = false;
    //       this.router.navigateByUrl('/home/patients/all-patient');
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //       this.isPatientDeleting = false;
    //     }
    //   })
  }

  putPatientImage(){
    // this.patientsApi.putPatientPhoto(this.patientForm.photo.image)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.isPatientSaving = false;
    //     },
    //     error: (err) => {
    //       console.log(err);          
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.patientsPrint.printViewPatient();
  }

}
