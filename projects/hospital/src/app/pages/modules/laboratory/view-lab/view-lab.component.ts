import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'
import { LabAttachmentsComponent } from '../lab-attachments/lab-attachments.component';

import { SelectAdmissionComponent } from '../../../../components/select-windows/admissions-windows/select-admission/select-admission.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { LaboratoryApiService } from 'projects/hospital/src/app/services/modules-api/laboratory-api/laboratory-api.service';
// import { LaboratoryPrintService } from 'projects/hospital/src/app/services/modules-printing/laboratory-print/laboratory-print.service';

import { Lab } from 'projects/hospital/src/app/models/modules/laboratory/laboratory.model';


@Component({
  selector: 'app-view-lab',
  templateUrl: './view-lab.component.html',
  styleUrls: ['./view-lab.component.scss']
})
export class ViewLabComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private labApi: LaboratoryApiService,
    // private labPrint: LaboratoryPrintService
  ) { }

  @ViewChild('existButtonElementReference', { read: ElementRef, static: false }) existButtonElement!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
  @ViewChild('labAttachmentsComponentReference', { read: LabAttachmentsComponent, static: false }) labAttachments!: LabAttachmentsComponent;

  @ViewChild('selectAdmissionComponentReference', { read: SelectAdmissionComponent, static: false }) selectAdmission!: SelectAdmissionComponent;
  
  navHeading: any[] = [
    { text: "All Labs", url: "/home/laboratory/all-labs" },
    { text: "View Lab", url: "/home/laboratory/view-lab" },
  ];

  labFormData: any;

  selectedAdmissionId = "";

  isLabLoading: boolean = false;
  isLabSaving: boolean = false;
  isLabDeleting: boolean = false;
  isCheckingDelivery: boolean = false;

  labForm = new FormGroup({
    labCode: new FormControl(''),
    labDate: new FormControl(),
    patientName: new FormControl({value: '', disabled: true}),
    patientNumber: new FormControl({value: '', disabled: true}),
    admissionCode: new FormControl({value: '', disabled: true}),
    labType: new FormControl(''),
  })

  ngOnInit(): void {
    this.getLab();
  }

  getLab(){
    this.isLabLoading = true;

    this.labApi.getLab()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.labFormData = res;
          this.isLabLoading = false;

          this.labForm.controls.labCode.setValue(this.labFormData.lab_code);
          this.labForm.controls.labDate.setValue(new Date(this.labFormData.lab_date).toISOString().slice(0, 10));
          this.labForm.controls.labType.setValue(this.labFormData.lab_type);

          this.selectedAdmissionId = this.labFormData.admission?.id;
          this.labForm.controls.admissionCode.setValue(this.labFormData.admission?.admission_code);
          this.labForm.controls.patientNumber.setValue(this.labFormData.admission?.patient?.clinical_number);
          this.labForm.controls.patientNumber.setValue(this.labFormData.admission?.patient?.last_name + " " + this.labFormData.admission?.patient?.first_name);
        },
        error: (err) => {
          console.log(err);
          this.isLabLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putLab(){
    let data: Lab = {
      account: this.customCookie.getCookie('hospital_id') as string,
      admission: this.selectedAdmissionId,
      lab_code: this.labForm.controls.labCode.value as string,
      lab_date: this.labForm.controls.labDate.value,
      lab_type: this.labForm.controls.labType.value as string,
    }

    console.log(data);
    this.isLabSaving = true;

    this.labApi.putLab(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isLabSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isLabSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteLab(){
    this.isLabDeleting = true;

    this.labApi.deleteLab()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.router.navigateByUrl('/home/labs/all-labs');
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
    this.labForm.controls.admissionCode.setValue(admissionData.admission_code);
    this.labForm.controls.patientName.setValue(admissionData.patient?.first_name + " " + admissionData.patient?.last_name);
    this.labForm.controls.patientNumber.setValue(admissionData.patient?.clinical_number);
  }

  onPrint(){
    console.log("lets start printing...");
    // this.labsPrint.printViewLab();
  }

  onPrintRoll(){
    console.log("lets start printing roll...");
    // this.labsPrint.printLabRoll();
  }

}
