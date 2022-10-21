import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { PaymentsApiService } from 'projects/school/src/app/services/modules-api/payments-api/payments-api.service';
// import { PaymentsPrintService } from 'projects/school/src/app/services/printing/payments-print/payments-print.service';

import { Payment } from 'projects/school/src/app/models/modules/payments/payments.model';


@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrls: ['./view-payment.component.scss']
})
export class ViewPaymentComponent implements OnInit {

  constructor(
    private router: Router,
    private paymentsApi: PaymentsApiService,
    // private paymentsPrint: PaymentsPrintService,
  ) { }

  @ViewChild('paymentFormComponentReference', { read: PaymentFormComponent, static: false }) paymentForm!: PaymentFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "View Payment", url: "/home/payments/view-payment" },
  ];

  paymentData: any;

  isPaymentLoading = false;
  isPaymentSaving = false;
  isPaymentDeleting = false;

  ngOnInit(): void {
    this.getPayment();
  }

  getPayment(){
    this.isPaymentLoading = true;

    this.paymentsApi.getPayment()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.paymentData = res;
          this.isPaymentLoading = false;

          this.paymentForm.paymentForm.controls.paymentCode.setValue(res.payment_code);
          this.paymentForm.paymentForm.controls.paymentDate.setValue(res.payment_date);
          this.paymentForm.paymentForm.controls.amountPaid.setValue(res.amount_paid);

          this.paymentForm.paymentForm.controls.term.setValue(res.term.term_name);
          this.paymentForm.paymentForm.controls.billCode.setValue(res.bill.bill_code);
          this.paymentForm.paymentForm.controls.studentCode.setValue(res.bill.student?.student_code);
          this.paymentForm.paymentForm.controls.studentName.setValue(res.bill.student?.student_name);
          this.paymentForm.paymentForm.controls.totalAmount.setValue(res.bill.total_amount);

          this.paymentForm.selectedBillId = res.bill.id;
          this.paymentForm.selectedTermId = res.term.id;

          this.paymentForm.setBalance()
        },
        error: (err) => {
          console.log(err);
          this.isPaymentLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  postPayment(){
    console.log('u are saving a new payment');

    var data = {
      payment_code: this.paymentForm.paymentForm.controls.paymentCode.value,
      payment_date: this.paymentForm.paymentForm.controls.paymentDate.value,
      amount_paid: this.paymentForm.paymentForm.controls.amountPaid.value,
      bill: this.paymentForm.selectedBillId,
    }

    console.log(data);
    this.isPaymentSaving = true;

    this.paymentsApi.postPayment(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isPaymentSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isPaymentSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deletePayment(){
    this.isPaymentDeleting = true;

    this.paymentsApi.deletePayment()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/payments/all-payments');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.paymentsPrint.printViewPayment();
  }

  onPrintRoll(){
    console.log("lets start printing roll...");
    // this.paymentsPrint.printPaymentRoll();
  }

}
