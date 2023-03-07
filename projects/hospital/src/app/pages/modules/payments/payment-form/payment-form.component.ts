import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SelectBillComponent } from '../../../../components/select-windows/bills-windows/select-bill/select-bill.component';


@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {

  constructor() { }

  @ViewChild('selectBillComponentReference', { read: SelectBillComponent, static: false }) selectBill!: SelectBillComponent;
  
  paymentForm = new FormGroup({
    paymentCode: new FormControl(''),
    paymentDate: new FormControl(),
    billCode: new FormControl({value: '', disabled: true}),
    admissionCode: new FormControl({value: '', disabled: true}),
    patientName: new FormControl({value: '', disabled: true}),
    patientNumber: new FormControl({value: '', disabled: true}),
    totalAmount: new FormControl({value: 0, disabled: true}),
    amountPaid: new FormControl(0),
    balance: new FormControl({value: 0, disabled: true}),
  })

  selectedBillId = '';

  ngOnInit(): void {
  }

  setBalance(){
    let amountPaid = this.paymentForm.controls.amountPaid.value;
    let totalAmount = this.paymentForm.controls.totalAmount.value;

    if(totalAmount != null && amountPaid != null){
      this.paymentForm.controls.balance.setValue(totalAmount - amountPaid);
    }
  }

  openBillWindow(){
    console.log("You are opening select bill window")
    this.selectBill.openModal();
  }

  onBillSelected(billData: any){
    console.log(billData);

    this.selectedBillId = billData.id;
    this.paymentForm.controls.billCode.setValue(billData.bill_code);
    this.paymentForm.controls.admissionCode.setValue(billData.admission?.admission_code);
    this.paymentForm.controls.patientName.setValue(billData.admission?.first_name + " " + billData.admission?.last_name);
    this.paymentForm.controls.patientNumber.setValue(billData.admission?.clinical_number);
  }

}
