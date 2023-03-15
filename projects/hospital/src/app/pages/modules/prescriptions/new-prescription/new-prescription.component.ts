import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { SelectAdmissionComponent } from '../../../../components/select-windows/admissions-windows/select-admission/select-admission.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { PrescriptionsApiService } from 'projects/hospital/src/app/services/modules-api/prescriptions-api/prescriptions-api.service';

import { Prescription } from 'projects/hospital/src/app/models/modules/prescriptions/prescriptions.model';


@Component({
  selector: 'app-new-prescription',
  templateUrl: './new-prescription.component.html',
  styleUrls: ['./new-prescription.component.scss']
})
export class NewPrescriptionComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private prescriptionsApi: PrescriptionsApiService,
  ) { }

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  @ViewChild('selectAdmissionComponentReference', { read: SelectAdmissionComponent, static: false }) selectAdmission!: SelectAdmissionComponent;

  selectedAdmissionId = '';
  
  isPrescriptionSaving = false;

  prescriptionForm = new FormGroup({
    prescriptionCode: new FormControl(''),
    prescriptionDate: new FormControl(),
    patientName: new FormControl({value: '', disabled: true}),
    patientNumber: new FormControl({value: '', disabled: true}),
    admissionCode: new FormControl({value: '', disabled: true}),
    consultantName: new FormControl(''),
  })

  ngOnInit(): void {
  }

  openModal(){
    this.newButton.nativeElement.click();
    this.prescriptionForm.controls.prescriptionDate.setValue(new Date().toISOString().slice(0, 16));
    this.getNewPrescriptionCodeConfig();
  }

  createPrescription(){
    let data: Prescription = {
      account: this.customCookie.getCookie('hospital_id') as string,
      admission: this.selectedAdmissionId,
      prescription_code: this.prescriptionForm.controls.prescriptionCode.value as string,
      prescription_date: this.prescriptionForm.controls.prescriptionDate.value,
      consultant_name: this.prescriptionForm.controls.consultantName.value as string,
    }

    console.log(data);
    this.isPrescriptionSaving = true;

    this.prescriptionsApi.postPrescription(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            sessionStorage.setItem('hospital_prescription_id', res.id);

            this.dismissButton.nativeElement.click();
            this.isPrescriptionSaving = false;
            this.router.navigateByUrl('/home/prescriptions/view-prescription');
          }
        },
        error: (err) => {
          console.log(err);
          this.isPrescriptionSaving = false;
          this.connectionToast.openToast();
        }
      })

    console.log(data);
  }

  openAdmissionWindow(){
    console.log("You are opening select admission window")
    this.selectAdmission.openModal();
  }

  onAdmissionSelected(admissionData: any){
    console.log(admissionData);

    this.selectedAdmissionId = admissionData.id;
    this.prescriptionForm.controls.admissionCode.setValue(admissionData.admission_code);
    this.prescriptionForm.controls.patientName.setValue(admissionData.patient?.first_name + " " + admissionData.patient?.last_name);
    this.prescriptionForm.controls.patientNumber.setValue(admissionData.patient?.clinical_number);
  }

  getNewPrescriptionCodeConfig(){
    this.prescriptionsApi.getNewPrescriptionCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.code){
            this.prescriptionForm.controls.prescriptionCode.setValue(res.code);
            this.prescriptionForm.controls.prescriptionCode.disable();
          }
          else{
            this.prescriptionForm.controls.prescriptionCode.enable();
          }
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
