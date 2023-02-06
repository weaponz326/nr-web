import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { PrescriptionsApiService } from 'projects/hospital/src/app/services/modules-api/prescriptions-api/prescriptions-api.service';

// import { Prescription } from 'projects/hospital/src/app/models/modules/prescriptions/prescriptions.model';


@Component({
  selector: 'app-new-prescription',
  templateUrl: './new-prescription.component.html',
  styleUrls: ['./new-prescription.component.scss']
})
export class NewPrescriptionComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    // private prescriptionsApi: PrescriptionsApiService,
  ) { }

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isPrescriptionSaving = false;

  prescriptionForm = new FormGroup({
    prescriptionCode: new FormControl(''),
    prescriptionDate: new FormControl(),
    patientName: new FormControl(''),
    patientNumber: new FormControl(''),
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
    // let data: Prescription = {
    let data = {
      account: this.customCookie.getCookie('hospital_id') as string,
      prescription_code: this.prescriptionForm.controls.prescriptionCode.value as string,
      prescription_date: this.prescriptionForm.controls.prescriptionDate.value as string,
      consultant_name: this.prescriptionForm.controls.consultantName.value as string,
    }

    console.log(data);
    this.isPrescriptionSaving = true;

    // this.prescriptionsApi.postPrescription(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       if(res.id){
    //         sessionStorage.setItem('hospital_prescription_id', res.id);

    //         this.dismissButton.nativeElement.click();
    //         this.isPrescriptionSaving = false;
    //         this.router.navigateByUrl('/home/prescriptions/view-prescription');
    //       }
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isPrescriptionSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   })

    console.log(data);
  }

  getNewPrescriptionCodeConfig(){
    this.prescriptionForm.controls.prescriptionCode.disable();

    // this.prescriptionsApi.getNewPrescriptionCodeConfig()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       if(res.code)
    //         this.prescriptionForm.controls.prescriptionCode.setValue(res.code);
    //       else
    //         this.prescriptionForm.controls.prescriptionCode.enable();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

}
