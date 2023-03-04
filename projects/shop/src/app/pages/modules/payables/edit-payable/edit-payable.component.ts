import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { PayableFormComponent } from '../payable-form/payable-form.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { Payable } from 'projects/shop/src/app/models/modules/payables/payables.model';


@Component({
  selector: 'app-edit-payable',
  templateUrl: './edit-payable.component.html',
  styleUrls: ['./edit-payable.component.scss']
})
export class EditPayableComponent implements OnInit {

  constructor(private customCookie: CustomCookieService) { }

  @Output() saveItemEvent = new EventEmitter<any>();
  @Output() deleteItemEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('payableFormComponentReference', { read: PayableFormComponent, static: false }) payableForm!: PayableFormComponent;

  navHeading: any[] = [
    { text: "All Items", url: "/home/payables/all-payables" },
    { text: "View Item", url: "/home/payables/view-payable" },
  ];

  payableData: any;

  isItemSaving = false;
  isItemDeleting = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.payableData = data;

    this.payableForm.payableForm.controls.payableCode.setValue(data.payable_code);
    this.payableForm.payableForm.controls.payableDate.setValue(data.recevable_date);
    this.payableForm.payableForm.controls.dueDate.setValue(data.due_date);
    this.payableForm.payableForm.controls.invoiceNumber.setValue(data.invoice_number);
    this.payableForm.payableForm.controls.customerName.setValue(data.customer_name);
    this.payableForm.payableForm.controls.amount.setValue(data.amount);
    this.payableForm.payableForm.controls.datePaid.setValue(data.date_paid);

    this.editButton.nativeElement.click();
  }

  saveItem(){
    // let data: Payable = {
    let data = {
      account: this.customCookie.getCookie('shop_id') as string,
      recevable_code: this.payableForm.payableForm.controls.payableCode.value as string,
      recevable_date: this.payableForm.payableForm.controls.payableDate.value,
      due_date: this.payableForm.payableForm.controls.dueDate.value,
      invoice_number: this.payableForm.payableForm.controls.invoiceNumber.value as string,
      customer_name: this.payableForm.payableForm.controls.customerName.value as string,
      amount: this.payableForm.payableForm.controls.amount.value as number,
      date_paid: this.payableForm.payableForm.controls.datePaid.value,
    }

    let item = {
      id: this.payableData.id,
      data: data
    }

    this.saveItemEvent.emit(item);
  }

  deleteItem(){
    this.deleteItemEvent.emit(this.payableData.id);
  }

}
