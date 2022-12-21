import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

// import { SelectBillComponent } from '../../../../components/select-windows/fees-windows/select-bill/select-bill.component';
import { SelectTermComponent } from '../../../../components/select-windows/terms-windows/select-term/select-term.component';


@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {

  constructor() { }

  // @ViewChild('selectBillComponentReference', { read: SelectBillComponent, static: false }) selectBill!: SelectBillComponent;
  @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;

  selectedBillId = "";
  selectedTermId = "";

  paymentForm = new FormGroup({
    paymentCode: new FormControl(''),
    paymentDate: new FormControl(''),
    term: new FormControl({value: '', disabled: true}),
    billCode: new FormControl({value: '', disabled: true}),
    studentCode: new FormControl({value: '', disabled: true}),
    studentName: new FormControl({value: '', disabled: true}),
    totalAmount: new FormControl({value: 0, disabled: true}),
    amountPaid: new FormControl(''),
    balance: new FormControl({value: '', disabled: true}),
  })

  ngOnInit(): void {
  }

  openBillWindow(){
    console.log("You are opening select bill window")
    // this.selectBill.openModal();
  }

  onBillSelected(billData: any){
    console.log(billData);

    this.selectedBillId = billData.id;

    this.paymentForm.controls.billCode.setValue(billData.bill_code);
    this.paymentForm.controls.studentCode.setValue(billData.student.student_code);
    this.paymentForm.controls.studentName.setValue(billData.student.student_name);
    this.paymentForm.controls.totalAmount.setValue(billData.total_amount);
  }

  openTermWindow(){
    console.log("You are opening select term window")
    this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    this.selectedTermId = termData.id;
    this.paymentForm.controls.term.setValue(termData.term_name);
  }

  setBalance(){
    // this.paymentForm.controls.balance.setValue(
    //   this.paymentForm.controls.totalAmount.value - this.paymentForm.controls.amountPaid.value
    // )
  }

}
