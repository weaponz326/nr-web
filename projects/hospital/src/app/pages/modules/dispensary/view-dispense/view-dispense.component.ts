import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'
import { DispenseItemsComponent } from '../dispense-items/dispense-items.component';

import { SelectAdmissionComponent } from '../../../../components/select-windows/admissions-windows/select-admission/select-admission.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { DispensaryApiService } from 'projects/hospital/src/app/services/modules-api/dispensary-api/dispensary-api.service';
// import { DispensaryPrintService } from 'projects/hospital/src/app/services/modules-printing/dispensary-print/dispensary-print.service';

import { Dispense } from 'projects/hospital/src/app/models/modules/dispensary/dispensary.model';


@Component({
  selector: 'app-view-dispense',
  templateUrl: './view-dispense.component.html',
  styleUrls: ['./view-dispense.component.scss']
})
export class ViewDispenseComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private dispensaryApi: DispensaryApiService,
    // private dispensaryPrint: DispensaryPrintService
  ) { }

  @ViewChild('existButtonElementReference', { read: ElementRef, static: false }) existButtonElement!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
  @ViewChild('dispenseItemsComponentReference', { read: DispenseItemsComponent, static: false }) dispenseItems!: DispenseItemsComponent;

  @ViewChild('selectAdmissionComponentReference', { read: SelectAdmissionComponent, static: false }) selectAdmission!: SelectAdmissionComponent;

  navHeading: any[] = [
    { text: "All Dispenses", url: "/home/dispensary/all-dispenses" },
    { text: "View Dispense", url: "/home/dispensary/view-dispense" },
  ];

  dispenseFormData: any;

  selectedAdmissionId = '';

  isDispenseLoading: boolean = false;
  isDispenseSaving: boolean = false;
  isDispenseDeleting: boolean = false;
  isCheckingDelivery: boolean = false;

  dispenseForm = new FormGroup({
    dispenseCode: new FormControl(''),
    dispenseDate: new FormControl(),
    patientName: new FormControl({value: '', disabled: true}),
    patientNumber: new FormControl({value: '', disabled: true}),
    admissionCode: new FormControl({value: '', disabled: true}),
  })

  ngOnInit(): void {
    this.getDispense();
  }

  getDispense(){
    this.isDispenseLoading = true;

    this.dispensaryApi.getDispense()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.dispenseFormData = res;
          this.isDispenseLoading = false;

          this.dispenseForm.controls.dispenseCode.setValue(this.dispenseFormData.dispense_code);
          this.dispenseForm.controls.dispenseDate.setValue(new Date(this.dispenseFormData.dispense_date).toISOString().slice(0, 16));

          this.selectedAdmissionId = this.dispenseFormData.admission?.id;
          this.dispenseForm.controls.admissionCode.setValue(this.dispenseFormData.admission?.admission_code);
          this.dispenseForm.controls.patientNumber.setValue(this.dispenseFormData.admission?.patient?.clinical_number);
          this.dispenseForm.controls.patientNumber.setValue(this.dispenseFormData.admission?.patient?.last_name + " " + this.dispenseFormData.admission?.patient?.first_name);
        },
        error: (err) => {
          console.log(err);
          this.isDispenseLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putDispense(){
    let data: Dispense = {
      account: this.customCookie.getCookie('hospital_id') as string,
      admission: this.selectedAdmissionId,
      dispense_code: this.dispenseForm.controls.dispenseCode.value as string,
      dispense_date: this.dispenseForm.controls.dispenseDate.value,
    }

    console.log(data);
    this.isDispenseSaving = true;

    this.dispensaryApi.putDispense(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isDispenseSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isDispenseSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteDispense(){
    this.isDispenseDeleting = true;

    this.dispensaryApi.deleteDispense()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.router.navigateByUrl('/home/dispenses/all-dispenses');
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
    this.dispenseForm.controls.admissionCode.setValue(admissionData.admission_code);
    this.dispenseForm.controls.patientName.setValue(admissionData.patient?.first_name + " " + admissionData.patient?.last_name);
    this.dispenseForm.controls.patientNumber.setValue(admissionData.patient?.clinical_number);
  }

  onPrint(){
    console.log("lets start printing...");
    // this.dispensesPrint.printViewDispense();
  }

  onPrintRoll(){
    console.log("lets start printing roll...");
    // this.dispensesPrint.printDispenseRoll();
  }

}
