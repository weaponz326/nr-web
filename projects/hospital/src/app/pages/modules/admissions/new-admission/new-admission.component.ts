import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AdmissionsApiService } from 'projects/hospital/src/app/services/modules-api/admissions-api/admissions-api.service';

// import { Admission } from 'projects/hospital/src/app/models/modules/admissions/admissions.model';


@Component({
  selector: 'app-new-admission',
  templateUrl: './new-admission.component.html',
  styleUrls: ['./new-admission.component.scss']
})
export class NewAdmissionComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private admissionsApi: AdmissionsApiService,
  ) { }

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isAdmissionSaving = false;

  admissionForm = new FormGroup({
    admissionCode: new FormControl(''),
    admissionDate: new FormControl(),
    dischargeDate: new FormControl(),
    patientName: new FormControl(''),
    patientNumber: new FormControl(''),
    admissionStatus: new FormControl(''),
  })


  ngOnInit(): void {
  }

  openModal(){
    this.newButton.nativeElement.click();
    this.admissionForm.controls.admissionDate.setValue(new Date().toISOString().slice(0, 16));
    this.getNewAdmissionCodeConfig();
  }

  createAdmission(){
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

    this.admissionsApi.postAdmission(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            sessionStorage.setItem('hospital_admission_id', res.id);

            this.dismissButton.nativeElement.click();
            this.isAdmissionSaving = false;
            this.router.navigateByUrl('/home/admissions/view-admission');
          }
        },
        error: (err) => {
          console.log(err);
          this.isAdmissionSaving = false;
          this.connectionToast.openToast();
        }
      })

    console.log(data);
  }

  getNewAdmissionCodeConfig(){
    this.admissionForm.controls.admissionCode.disable();

    this.admissionsApi.getNewAdmissionCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.code)
            this.admissionForm.controls.admissionCode.setValue(res.code);
          else
            this.admissionForm.controls.admissionCode.enable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
