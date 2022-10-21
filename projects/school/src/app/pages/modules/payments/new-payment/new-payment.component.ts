import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';
import { PaymentsApiService } from 'projects/school/src/app/services/modules-api/payments-api/payments-api.service';

import { Payment } from 'projects/school/src/app/models/modules/payments/payments.model';


@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.scss']
})
export class NewPaymentComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    // private activeTerm: ActiveTermService,
    private paymentsApi: PaymentsApiService
  ) { }

  @ViewChild('paymentFormComponentReference', { read: PaymentFormComponent, static: false }) paymentForm!: PaymentFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Payment", url: "/home/payments/new-payment" },
  ];

  isPaymentSaving = false;

  ngOnInit(): void {
    this.getNewPaymentCodeConfig();
  }

  ngAfterViewInit(): void {
    this.paymentForm.paymentForm.controls.paymentDate.setValue(new Date().toISOString().slice(0, 16));

    // let activeTerm = this.activeTerm.getActiveTerm();
    // this.paymentForm.paymentForm.controls.term.setValue(activeTerm.term_name);
    // this.paymentForm.selectedTermId = activeTerm.id;
  }

  postPayment(){
    console.log('u are saving a new payment');

    var data: Payment = {
      account: this.customCookie.getCookie('restaurant_id') as string,
      payment_code: this.paymentForm.paymentForm.controls.paymentCode.value as string,
      payment_date: this.paymentForm.paymentForm.controls.paymentDate.value as string,
      amount_paid: this.paymentForm.paymentForm.controls.amountPaid.value as string,
      bill: this.paymentForm.selectedBillId,
      term: this.paymentForm.selectedTermId,
    }

    console.log(data);
    this.isPaymentSaving = true;

    this.paymentsApi.postPayment(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isPaymentSaving = false;

          sessionStorage.setItem('school_payment_id', res.id);
          this.router.navigateByUrl('/home/payments/view-payment');
        },
        error: (err) => {
          console.log(err);
          this.isPaymentSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  getNewPaymentCodeConfig(){
    this.paymentsApi.getNewPaymentCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.paymentForm.paymentForm.controls.paymentCode.disable();

          if(res.code)
            this.paymentForm.paymentForm.controls.paymentCode.setValue(res.code);
          else
            this.paymentForm.paymentForm.controls.paymentCode.enable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }
  
}
