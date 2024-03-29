import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { DiagnosisApiService } from 'projects/hospital/src/app/services/modules-api/diagnosis-api/diagnosis-api.service';

// import { Diagnosis } from 'projects/hospital/src/app/models/modules/diagnosis/diagnosis.model';


@Component({
  selector: 'app-new-diagnosis',
  templateUrl: './new-diagnosis.component.html',
  styleUrls: ['./new-diagnosis.component.scss']
})
export class NewDiagnosisComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private diagnosisApi: DiagnosisApiService,
    // private deliveriesApi: DeliveriesApiService
  ) { }

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isDiagnosisSaving = false;

  diagnosisForm = new FormGroup({
    diagnosisCode: new FormControl(''),
    diagnosisDate: new FormControl(),
    patientName: new FormControl(''),
    patientNumber: new FormControl(''),
    consultantName: new FormControl('')
  })


  ngOnInit(): void {
  }

  openModal(){
    this.newButton.nativeElement.click();
    this.diagnosisForm.controls.diagnosisDate.setValue(new Date().toISOString().slice(0, 16));
    this.getNewDiagnosisCodeConfig();
  }

  createDiagnosis(){
    // let data: Diagnosis = {
    let data = {
      account: this.customCookie.getCookie('hospital_id') as string,
      diagnosis_code: this.diagnosisForm.controls.diagnosisCode.value as string,
      diagnosis_date: this.diagnosisForm.controls.diagnosisDate.value as string,
    }

    console.log(data);
    this.isDiagnosisSaving = true;

    this.diagnosisApi.postDiagnosis(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            sessionStorage.setItem('hospital_diagnosis_id', res.id);

            this.dismissButton.nativeElement.click();
            this.isDiagnosisSaving = false;
            this.router.navigateByUrl('/home/diagnosis/view-diagnosis');
          }
        },
        error: (err) => {
          console.log(err);
          this.isDiagnosisSaving = false;
          this.connectionToast.openToast();
        }
      })

    console.log(data);
  }

  getNewDiagnosisCodeConfig(){
    this.diagnosisForm.controls.diagnosisCode.disable();

    this.diagnosisApi.getNewDiagnosisCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.code)
            this.diagnosisForm.controls.diagnosisCode.setValue(res.code);
          else
            this.diagnosisForm.controls.diagnosisCode.enable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }
 
}
