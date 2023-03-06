import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { DiagnosisApiService } from 'projects/hospital/src/app/services/modules-api/diagnosis-api/diagnosis-api.service';

import { DiagnosisDetails } from 'projects/hospital/src/app/models/modules/diagnosis/diagnosis.model';


@Component({
  selector: 'app-diagnosis-details',
  templateUrl: './diagnosis-details.component.html',
  styleUrls: ['./diagnosis-details.component.scss']
})
export class DiagnosisDetailsComponent implements OnInit {

  constructor(
    private diagnosisApi: DiagnosisApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  diagnosisDetailsForm = new FormGroup({
    bloodGroup: new FormControl(''),
    temperature: new FormControl(),
    weight: new FormControl(),
    height: new FormControl(),
    bloodPressure: new FormControl(),
    pulse: new FormControl(),
    diagnosis: new FormControl(''),
    treatment: new FormControl(''),
    remarks: new FormControl(''),
  })

  bloodGroupOptions = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];

  ngOnInit(): void {
    this.getDiagnosisDetail();
  }

  getDiagnosisDetail(){
    this.diagnosisApi.getDiagnosisDetail()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.diagnosisDetailsForm.controls.bloodGroup.setValue(res.blood_group);
          this.diagnosisDetailsForm.controls.temperature.setValue(res.temperature);
          this.diagnosisDetailsForm.controls.weight.setValue(res.weight);
          this.diagnosisDetailsForm.controls.height.setValue(res.height);
          this.diagnosisDetailsForm.controls.bloodPressure.setValue(res.blood_pressure);
          this.diagnosisDetailsForm.controls.pulse.setValue(res.pulse);
          this.diagnosisDetailsForm.controls.diagnosis.setValue(res.diagnosis_details);
          this.diagnosisDetailsForm.controls.treatment.setValue(res.treatment);
          this.diagnosisDetailsForm.controls.remarks.setValue(res.remarks);
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  saveDiagnosisDetail(){
    let data: DiagnosisDetails = {
      blood_group: this.diagnosisDetailsForm.controls.bloodGroup.value as string,
      temperature: this.diagnosisDetailsForm.controls.temperature.value as number,
      weight: this.diagnosisDetailsForm.controls.weight.value as number,
      height: this.diagnosisDetailsForm.controls.height.value as number,
      blood_pressure: this.diagnosisDetailsForm.controls.bloodPressure.value as number,
      pulse: this.diagnosisDetailsForm.controls.pulse.value as number,
      diagnosis: this.diagnosisDetailsForm.controls.diagnosis.value as string,
      treatment: this.diagnosisDetailsForm.controls.treatment.value as string,
      remarks: this.diagnosisDetailsForm.controls.remarks.value as string,
    }

    console.log(data);

    this.diagnosisApi.putDiagnosis(data)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.diagnosisPrint.printViewDiagnosis();
  }

}

