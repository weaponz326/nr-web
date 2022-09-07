import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { PaymentsApiService } from 'projects/restaurant/src/app/services/modules-api/payments-api/payments-api.service';

import { Payment } from 'projects/restaurant/src/app/models/modules/payments/payments.model';


@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.scss']
})
export class NewPaymentComponent implements OnInit {

  constructor(
    private router: Router,
    private paymentsApi: PaymentsApiService
  ) { }

  @ViewChild('paymentFormComponentReference', { read: PaymentFormComponent, static: false }) paymentForm!: PaymentFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Payment", url: "/home/payments/new-payment" },
  ];

  isPaymentSaving = false;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.paymentForm.paymentForm.controls.paymentDate.setValue(new Date().toISOString().slice(0, 16))
  }

  createPayment(){
    console.log('u are saving a new payment');

    var data: Payment = {
      account: localStorage.getItem('restaurant_id') as string,
      order: this.paymentForm.selectedOrderId,
      payment_code: this.paymentForm.paymentForm.controls.paymentCode.value as string,
      payment_date: this.paymentForm.paymentForm.controls.paymentDate.value,
      amount_paid: this.paymentForm.paymentForm.controls.amountPaid.value as number,
    }

    console.log(data);
    this.isPaymentSaving = true;

    this.paymentsApi.postPayment(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isPaymentSaving = false;

          sessionStorage.setItem('restaurant_payment_id', res.id);
          this.router.navigateByUrl('/home/payments/view-payment');
        },
        error: (err) => {
          console.log(err);
          this.isPaymentSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

}
