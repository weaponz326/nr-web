import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { BillsApiService } from 'projects/hospital/src/app/services/modules-api/bills-api/bills-api.service';

// import { Bill } from 'projects/hospital/src/app/models/modules/bills/bills.model';


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

  isBillSaving = false;

  billForm = new FormGroup({
    billCode: new FormControl(''),
    billDate: new FormControl(),
    patientName: new FormControl(''),
    patientNumber: new FormControl(''),
    admissionCode: new FormControl(''),
  })


  ngOnInit(): void {
  }

  openModal(){
    this.newButton.nativeElement.click();
    this.billForm.controls.billDate.setValue(new Date().toISOString().slice(0, 16));
    this.getNewBillCodeConfig();
  }

  createBill(){
    // let data: Bill = {
    let data = {
      account: this.customCookie.getCookie('hospital_id') as string,
      bill_code: this.billForm.controls.billCode.value as string,
      bill_date: this.billForm.controls.billDate.value as string,
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

  getNewBillCodeConfig(){
    this.billForm.controls.billCode.disable();

    this.billsApi.getNewBillCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.code)
            this.billForm.controls.billCode.setValue(res.code);
          else
            this.billForm.controls.billCode.enable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
