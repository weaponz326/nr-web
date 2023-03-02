import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { ReceivableFormComponent } from '../receivable-form/receivable-form.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { Receivable } from 'projects/shop/src/app/models/modules/receivables/receivables.model';


@Component({
  selector: 'app-edit-receivable',
  templateUrl: './edit-receivable.component.html',
  styleUrls: ['./edit-receivable.component.scss']
})
export class EditReceivableComponent implements OnInit {

  constructor(private customCookie: CustomCookieService) { }

  @Output() saveItemEvent = new EventEmitter<any>();
  @Output() deleteItemEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('receivableFormComponentReference', { read: ReceivableFormComponent, static: false }) receivableForm!: ReceivableFormComponent;

  navHeading: any[] = [
    { text: "All Items", url: "/home/receivables/all-receivables" },
    { text: "View Item", url: "/home/receivables/view-receivable" },
  ];

  receivableData: any;

  isItemSaving = false;
  isItemDeleting = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.receivableData = data;

    this.receivableForm.receivableForm.controls.receivableCode.setValue(data.receivable_code);
    this.receivableForm.receivableForm.controls.receivableDate.setValue(data.recevable_date);
    this.receivableForm.receivableForm.controls.dueDate.setValue(data.due_date);
    this.receivableForm.receivableForm.controls.invoiceNumber.setValue(data.invoice_number);
    this.receivableForm.receivableForm.controls.customerName.setValue(data.customer_name);
    this.receivableForm.receivableForm.controls.amount.setValue(data.amount);
    this.receivableForm.receivableForm.controls.dateReceived.setValue(data.date_received);

    this.editButton.nativeElement.click();
  }

  saveItem(){
    // let data: Receivable = {
    let data = {
      account: this.customCookie.getCookie('shop_id') as string,
      recevable_code: this.receivableForm.receivableForm.controls.receivableCode.value as string,
      recevable_date: this.receivableForm.receivableForm.controls.receivableDate.value,
      due_date: this.receivableForm.receivableForm.controls.dueDate.value,
      invoice_number: this.receivableForm.receivableForm.controls.invoiceNumber.value as string,
      customer_name: this.receivableForm.receivableForm.controls.customerName.value as string,
      amount: this.receivableForm.receivableForm.controls.amount.value as number,
      date_received: this.receivableForm.receivableForm.controls.dateReceived.value,
    }

    let item = {
      id: this.receivableData.id,
      data: data
    }

    this.saveItemEvent.emit(item);
  }

  deleteItem(){
    this.deleteItemEvent.emit(this.receivableData.id);
  }

}
