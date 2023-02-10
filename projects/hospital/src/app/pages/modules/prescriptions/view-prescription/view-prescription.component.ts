import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { PrescriptionsApiService } from 'projects/hospital/src/app/services/modules-api/prescriptions-api/prescriptions-api.service';
// import { PrescriptionsPrintService } from 'projects/hospital/src/app/services/modules-printing/prescriptions-print/prescriptions-print.service';

// import { Prescription } from 'projects/hospital/src/app/models/modules/prescriptions/prescriptions.model';


@Component({
  selector: 'app-view-prescription',
  templateUrl: './view-prescription.component.html',
  styleUrls: ['./view-prescription.component.scss']
})
export class ViewPrescriptionComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    // private prescriptionsApi: PrescriptionsApiService,
    // private prescriptionsPrint: PrescriptionsPrintService
  ) { }

  @ViewChild('existButtonElementReference', { read: ElementRef, static: false }) existButtonElement!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Prescriptions", url: "/home/prescriptions/all-prescriptions" },
    { text: "View Prescription", url: "/home/prescriptions/view-prescription" },
  ];

  prescriptionFormData: any;

  isPrescriptionLoading: boolean = false;
  isPrescriptionSaving: boolean = false;
  isPrescriptionDeleting: boolean = false;

  prescriptionForm = new FormGroup({
    prescriptionCode: new FormControl(''),
    prescriptionDate: new FormControl(),
    patientName: new FormControl(''),
    patientNumber: new FormControl(''),
    consultantName: new FormControl(''),
  })

  ngOnInit(): void {
    this.getPrescription();
  }

  getPrescription(){
    this.isPrescriptionLoading = true;

    // this.prescriptionsApi.getPrescription()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       this.prescriptionFormData = res;
    //       this.isPrescriptionLoading = false;

    //       this.prescriptionForm.controls.prescriptionCode.setValue(this.prescriptionFormData.prescription_code);
    //       this.prescriptionForm.controls.prescriptionDate.setValue(new Date(this.prescriptionFormData.prescription_date).toISOString().slice(0, 16));
    //       this.prescriptionForm.controls.consultantName.setValue(this.prescriptionFormData.consultant_name);
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isPrescriptionLoading = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  putPrescription(){
    // let data: Prescription = {
      let data = {
        account: this.customCookie.getCookie('hospital_id') as string,
        prescription_code: this.prescriptionForm.controls.prescriptionCode.value as string,
        prescription_date: this.prescriptionForm.controls.prescriptionDate.value as string,
        consultant_name: this.prescriptionForm.controls.consultantName.value as string,
      }

    console.log(data);
    this.isPrescriptionSaving = true;

    // this.prescriptionsApi.putPrescription(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.isPrescriptionSaving = false;
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isPrescriptionSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deletePrescription(){
    this.isPrescriptionDeleting = true;

    // this.prescriptionsApi.deletePrescription()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       this.router.navigateByUrl('/home/prescriptions/all-prescriptions');
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.prescriptionsPrint.printViewPrescription();
  }

  onPrintRoll(){
    console.log("lets start printing roll...");
    // this.prescriptionsPrint.printPrescriptionRoll();
  }

}
