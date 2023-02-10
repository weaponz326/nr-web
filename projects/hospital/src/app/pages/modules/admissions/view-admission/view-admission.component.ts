import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { AdmissionsApiService } from 'projects/hospital/src/app/services/modules-api/admissions-api/admissions-api.service';
// import { AdmissionsPrintService } from 'projects/hospital/src/app/services/modules-printing/admissions-print/admissions-print.service';

// import { Admission } from 'projects/hospital/src/app/models/modules/admissions/admissions.model';


@Component({
  selector: 'app-view-admission',
  templateUrl: './view-admission.component.html',
  styleUrls: ['./view-admission.component.scss']
})
export class ViewAdmissionComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    // private admissionsApi: AdmissionsApiService,
    // private admissionsPrint: AdmissionsPrintService
  ) { }

  @ViewChild('existButtonElementReference', { read: ElementRef, static: false }) existButtonElement!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Admissions", url: "/home/admissions/all-admissions" },
    { text: "View Admission", url: "/home/admissions/view-admission" },
  ];

  admissionFormData: any;

  isAdmissionLoading: boolean = false;
  isAdmissionSaving: boolean = false;
  isAdmissionDeleting: boolean = false;

  admissionForm = new FormGroup({
    admissionCode: new FormControl(''),
    admissionDate: new FormControl(),
    dischargeDate: new FormControl(),
    patientName: new FormControl(''),
    patientNumber: new FormControl(''),
    admissionStatus: new FormControl(''),
  })

  ngOnInit(): void {
    this.getAdmission();
  }

  getAdmission(){
    this.isAdmissionLoading = true;

    // this.admissionsApi.getAdmission()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       this.admissionFormData = res;
    //       this.isAdmissionLoading = false;

    //       this.admissionForm.controls.admissionCode.setValue(this.admissionFormData.admission_code);
    //       this.admissionForm.controls.admissionDate.setValue(new Date(this.admissionFormData.admission_date).toISOString().slice(0, 16));
    //       this.admissionForm.controls.dischargeDate.setValue(new Date(this.admissionFormData.discharge_date).toISOString().slice(0, 16));
    //       this.admissionForm.controls.admissionStatus.setValue(this.admissionFormData.admission_status);
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isAdmissionLoading = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  putAdmission(){
    // let data: Admission = {
    let data = {
      account: this.customCookie.getCookie('hospital_id') as string,
      admission_code: this.admissionForm.controls.admissionCode.value as string,
      admission_date: this.admissionForm.controls.admissionDate.value as string,
      discharge_date: this.admissionForm.controls.dischargeDate.value as string,
      admission_status: this.admissionForm.controls.admissionStatus.value as string,
    }

    console.log(data);
    this.isAdmissionSaving = true;

    // this.admissionsApi.putAdmission(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.isAdmissionSaving = false;
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isAdmissionSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteAdmission(){
    this.isAdmissionDeleting = true;

    // this.admissionsApi.deleteAdmission()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       this.router.navigateByUrl('/home/admissions/all-admissions');
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.admissionsPrint.printViewAdmission();
  }

  onPrintRoll(){
    console.log("lets start printing roll...");
    // this.admissionsPrint.printAdmissionRoll();
  }

}
