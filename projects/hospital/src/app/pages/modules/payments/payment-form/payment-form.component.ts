import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {

  constructor() { }

  paymentForm = new FormGroup({
    paymentCode: new FormControl(''),
    paymentDate: new FormControl(),
    admissionCode: new FormControl({value: '', disabled: true}),
    patientName: new FormControl({value: '', disabled: true}),
    patientNumber: new FormControl({value: '', disabled: true}),
    totalAmount: new FormControl({value: 0, disabled: true}),
    amountPaid: new FormControl(0),
    balance: new FormControl({value: 0, disabled: true}),
  })

  ngOnInit(): void {
  }

  setBalance(){
    let amountPaid = this.paymentForm.controls.amountPaid.value;
    let totalAmount = this.paymentForm.controls.totalAmount.value;

    if(totalAmount != null && amountPaid != null){
      this.paymentForm.controls.balance.setValue(totalAmount - amountPaid);
    }
  }

}
