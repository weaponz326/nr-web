import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
// import { DeleteModalComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal/delete-modal.component'

// import { PaymentsApiService } from 'projects/school/src/app/services/modules/payments-api/payments-api.service';
// import { PaymentsPrintService } from 'projects/school/src/app/services/printing/payments-print/payments-print.service';

// import { Payment } from 'projects/school/src/app/models/modules/payments/payments.model';


@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrls: ['./view-payment.component.scss']
})
export class ViewPaymentComponent implements OnInit {

  constructor(
    private router: Router,
    // private paymentsApi: PaymentsApiService,
    // private paymentsPrint: PaymentsPrintService,
  ) { }

  @ViewChild('paymentFormComponentReference', { read: PaymentFormComponent, static: false }) paymentForm!: PaymentFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('deleteModalComponentReference', { read: DeleteModalComponent, static: false }) deleteModal!: DeleteModalComponent;

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

    // this.paymentsApi.getPayment()
    //   .then(
    //     (res: any) => {
    //       console.log(res.data());

    //       this.paymentData = res;
    //       this.isPaymentLoading = false;

    //       this.paymentForm.paymentForm.controls.paymentCode.setValue(res.data().payment_code);
    //       this.paymentForm.paymentForm.controls.paymentDate.setValue(res.data().payment_date);
    //       this.paymentForm.paymentForm.controls.amountPaid.setValue(res.data().amount_paid);

    //       this.paymentForm.paymentForm.controls.term.setValue(res.data().term.data.term_name);
    //       this.paymentForm.paymentForm.controls.billCode.setValue(res.data().bill.data.bill_code);
    //       this.paymentForm.paymentForm.controls.studentCode.setValue(res.data().bill.data.student?.data.student_code);
    //       this.paymentForm.paymentForm.controls.studentName.setValue(res.data().bill.data.student?.data.student_name);
    //       this.paymentForm.paymentForm.controls.totalAmount.setValue(res.data().bill.data.total_amount);

    //       this.paymentForm.selectedBillId = res.data().bill.id;
    //       this.paymentForm.selectedBillData = res.data().bill.data;
    //       this.paymentForm.selectedTermId = res.data().term.id;
    //       this.paymentForm.selectedTermData = res.data().term.data;

    //       this.paymentForm.setBalance()
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isPaymentLoading = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  updatePayment(){
    console.log('u are saving a new payment');

    var data = {
      payment_code: this.paymentForm.paymentForm.controls.paymentCode.value,
      payment_date: this.paymentForm.paymentForm.controls.paymentDate.value,
      amount_paid: this.paymentForm.paymentForm.controls.amountPaid.value,
      bill: this.paymentForm.selectedBillId,
    }

    console.log(data);
    this.isPaymentSaving = true;

    // this.paymentsApi.updatePayment(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.isPaymentSaving = false;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isPaymentSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  confirmDelete(){
    // this.deleteModal.openModal();
  }

  deletePayment(){
    this.isPaymentDeleting = true;

    // this.paymentsApi.deletePayment()
    //   .then(
    //     (res: any) => {
    //       console.log(res);

    //       this.router.navigateByUrl('/home/payments/all-payments');
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   )
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
