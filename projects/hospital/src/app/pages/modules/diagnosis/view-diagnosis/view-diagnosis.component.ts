import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'
import { DiagnosisDetailsComponent } from '../diagnosis-details/diagnosis-details.component';

import { SelectPatientComponent } from '../../../../components/select-windows/patients-windows/select-patient/select-patient.component';
import { SelectAdmissionComponent } from '../../../../components/select-windows/admissions-windows/select-admission/select-admission.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { DiagnosisApiService } from 'projects/hospital/src/app/services/modules-api/diagnosis-api/diagnosis-api.service';
// import { DiagnosisPrintService } from 'projects/hospital/src/app/services/modules-printing/diagnosis-print/diagnosis-print.service';

import { Diagnosis } from 'projects/hospital/src/app/models/modules/diagnosis/diagnosis.model';


@Component({
  selector: 'app-view-diagnosis',
  templateUrl: './view-diagnosis.component.html',
  styleUrls: ['./view-diagnosis.component.scss']
})
export class ViewDiagnosisComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private diagnosisApi: DiagnosisApiService,
    // private diagnosisPrint: DiagnosisPrintService
  ) { }

  @ViewChild('existButtonElementReference', { read: ElementRef, static: false }) existButtonElement!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
  @ViewChild('diagnosisDetailsComponentReference', { read: DiagnosisDetailsComponent, static: false }) diagnosisDetails!: DiagnosisDetailsComponent;

  @ViewChild('selectPatientComponentReference', { read: SelectPatientComponent, static: false }) selectPatient!: SelectPatientComponent;
  @ViewChild('selectAdmissionComponentReference', { read: SelectAdmissionComponent, static: false }) selectAdmission!: SelectAdmissionComponent;

  navHeading: any[] = [
    { text: "All Diagnosis", url: "/home/diagnosis/all-diagnosis" },
    { text: "View Diagnosis", url: "/home/diagnosis/view-diagnosis" },
  ];

  selectedPatientId = '';
  selectedAdmissionId = '';

  diagnosisFormData: any;

  isDiagnosisLoading: boolean = false;
  isDiagnosisaving: boolean = false;
  isDiagnosisDeleting: boolean = false;
  isCheckingDelivery: boolean = false;

  diagnosisForm = new FormGroup({
    diagnosisCode: new FormControl(''),
    diagnosisDate: new FormControl(),
    patientName: new FormControl({value: '', disabled: true}),
    patientNumber: new FormControl({value: '', disabled: true}),
    admissionCode: new FormControl({value: '', disabled: true}),
    consultantName: new FormControl('')
  })

  ngOnInit(): void {
    this.getDiagnosis();
    this.getDiagnosisCodeConfig();
  }

  getDiagnosis(){
    this.isDiagnosisLoading = true;

    this.diagnosisApi.getDiagnosis()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.diagnosisFormData = res;
          this.isDiagnosisLoading = false;

          this.diagnosisForm.controls.diagnosisCode.setValue(this.diagnosisFormData.diagnosis_code);
          this.diagnosisForm.controls.diagnosisDate.setValue(new Date(this.diagnosisFormData.diagnosis_date).toISOString().slice(0, 16));
          this.diagnosisForm.controls.consultantName.setValue(this.diagnosisFormData.consultant_name);

          this.selectedAdmissionId = this.diagnosisFormData.admission?.id;
          this.diagnosisForm.controls.admissionCode.setValue(this.diagnosisFormData.admission?.admission_code);
          this.diagnosisForm.controls.patientNumber.setValue(this.diagnosisFormData.admission?.patient?.clinical_number);
          this.diagnosisForm.controls.patientNumber.setValue(this.diagnosisFormData.admission?.patient?.last_name + " " + this.diagnosisFormData.admission?.patient?.first_name);
        },
        error: (err) => {
          console.log(err);
          this.isDiagnosisLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putDiagnosis(){
    let data: Diagnosis = {
      account: this.customCookie.getCookie('hospital_id') as string,
      admission: this.selectedAdmissionId,
      diagnosis_code: this.diagnosisForm.controls.diagnosisCode.value as string,
      diagnosis_date: this.diagnosisForm.controls.diagnosisDate.value,
      consultant_name: this.diagnosisForm.controls.consultantName.value as string,
    }

    console.log(data);
    this.isDiagnosisaving = true;

    this.diagnosisDetails.saveDiagnosisDetail();

    this.diagnosisApi.putDiagnosis(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isDiagnosisaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isDiagnosisaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteDiagnosis(){
    this.isDiagnosisDeleting = true;

    this.diagnosisApi.deleteDiagnosis()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.router.navigateByUrl('/home/diagnosis/all-diagnosis');
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
    this.diagnosisForm.controls.admissionCode.setValue(admissionData.admission_code);
    this.diagnosisForm.controls.patientName.setValue(admissionData.patient?.first_name + " " + admissionData.patient?.last_name);
    this.diagnosisForm.controls.patientNumber.setValue(admissionData.patient?.clinical_number);
  }

  getDiagnosisCodeConfig(){
    this.diagnosisApi.getDiagnosisCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.entry_mode == "Auto")
            this.diagnosisForm.controls.diagnosisCode.disable();
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
