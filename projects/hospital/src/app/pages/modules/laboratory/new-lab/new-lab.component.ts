import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { SelectAdmissionComponent } from '../../../../components/select-windows/admissions-windows/select-admission/select-admission.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { LaboratoryApiService } from 'projects/hospital/src/app/services/modules-api/laboratory-api/laboratory-api.service';

import { Lab } from 'projects/hospital/src/app/models/modules/laboratory/laboratory.model';


@Component({
  selector: 'app-new-lab',
  templateUrl: './new-lab.component.html',
  styleUrls: ['./new-lab.component.scss']
})
export class NewLabComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private labApi: LaboratoryApiService,
  ) { }

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  @ViewChild('selectAdmissionComponentReference', { read: SelectAdmissionComponent, static: false }) selectAdmission!: SelectAdmissionComponent;

  selectedAdmissionId = '';

  isLabSaving = false;

  labForm = new FormGroup({
    labCode: new FormControl(''),
    labDate: new FormControl(),
    patientName: new FormControl({value: '', disabled: true}),
    patientNumber: new FormControl({value: '', disabled: true}),
    admissionCode: new FormControl({value: '', disabled: true}),
    labType: new FormControl(''),
  })

  ngOnInit(): void {
  }

  openModal(){
    this.newButton.nativeElement.click();
    this.labForm.controls.labDate.setValue(new Date().toISOString().slice(0, 10));
    this.getNewLabCodeConfig();
  }

  createLab(){
    let data: Lab = {
      account: this.customCookie.getCookie('hospital_id') as string,
      admission: this.selectedAdmissionId,
      lab_code: this.labForm.controls.labCode.value as string,
      lab_date: this.labForm.controls.labDate.value,
      lab_type: this.labForm.controls.labType.value as string,
    }

    console.log(data);
    this.isLabSaving = true;

    this.labApi.postLab(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            sessionStorage.setItem('hospital_lab_id', res.id);

            this.dismissButton.nativeElement.click();
            this.isLabSaving = false;
            this.router.navigateByUrl('/home/laboratory/view-lab');
          }
        },
        error: (err) => {
          console.log(err);
          this.isLabSaving = false;
          this.connectionToast.openToast();
        }
      })

    console.log(data);
  }

  getNewLabCodeConfig(){
    this.labForm.controls.labCode.disable();

    this.labApi.getNewLabCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.code)
            this.labForm.controls.labCode.setValue(res.code);
          else
            this.labForm.controls.labCode.enable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  openAdmissionWindow(){
    console.log("You are opening select admission window")
    this.selectAdmission.openModal();
  }

  onAdmissionSelected(admissionData: any){
    console.log(admissionData);

    this.selectedAdmissionId = admissionData.id;
    this.labForm.controls.admissionCode.setValue(admissionData.admission_code);
    this.labForm.controls.patientName.setValue(admissionData.patient?.first_name + " " + admissionData.patient?.last_name);
    this.labForm.controls.patientNumber.setValue(admissionData.patient?.clinical_number);
  }
  
}
