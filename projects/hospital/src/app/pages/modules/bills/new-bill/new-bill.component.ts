import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { SelectAdmissionComponent } from '../../../../components/select-windows/admissions-windows/select-admission/select-admission.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { BillsApiService } from 'projects/hospital/src/app/services/modules-api/bills-api/bills-api.service';

import { Bill } from 'projects/hospital/src/app/models/modules/bills/bills.model';


@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.scss']
})
export class NewBillComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private billsApi: BillsApiService,
  ) { }

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  @ViewChild('selectAdmissionComponentReference', { read: SelectAdmissionComponent, static: false }) selectAdmission!: SelectAdmissionComponent;

  selectedAdmissionId = '';

  isBillSaving = false;

  billForm = new FormGroup({
    billCode: new FormControl(''),
    billDate: new FormControl(),
    patientName: new FormControl({value: '', disabled: true}),
    patientNumber: new FormControl({value: '', disabled: true}),
    admissionCode: new FormControl({value: '', disabled: true}),
  })


  ngOnInit(): void {
  }

  openModal(){
    this.newButton.nativeElement.click();
    this.billForm.controls.billDate.setValue(new Date().toISOString().slice(0, 16));
    this.getNewBillCodeConfig();
  }

  createBill(){
    let data: Bill = {
      account: this.customCookie.getCookie('hospital_id') as string,
      admission: this.selectedAdmissionId,
      bill_code: this.billForm.controls.billCode.value as string,
      bill_date: this.billForm.controls.billDate.value,
      total_amount: 0,
      bill_status: "",
    }

    console.log(data);
    this.isBillSaving = true;

    this.billsApi.postBill(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            sessionStorage.setItem('hospital_bill_id', res.id);

            this.dismissButton.nativeElement.click();
            this.isBillSaving = false;
            this.router.navigateByUrl('/home/bills/view-bill');
          }
        },
        error: (err) => {
          console.log(err);
          this.isBillSaving = false;
          this.connectionToast.openToast();
        }
      })

    console.log(data);
  }

  openAdmissionWindow(){
    console.log("You are opening select admission window")
    this.selectAdmission.openModal();
  }

  onAdmissionSelected(admissionData: any){
    console.log(admissionData);

    this.selectedAdmissionId = admissionData.id;
    this.billForm.controls.admissionCode.setValue(admissionData.admission_code);
    this.billForm.controls.patientName.setValue(admissionData.patient?.first_name + " " + admissionData.patient?.last_name);
    this.billForm.controls.patientNumber.setValue(admissionData.patient?.clinical_number);
  }

  getNewBillCodeConfig(){
    this.billsApi.getNewBillCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.code){
            this.billForm.controls.billCode.setValue(res.code);
            this.billForm.controls.billCode.disable();
          }
          else{
            this.billForm.controls.billCode.enable();
          }
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
