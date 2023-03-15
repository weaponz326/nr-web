import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { ReceivableFormComponent } from '../receivable-form/receivable-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { SelectCustomerComponent } from '../../../../components/select-windows/customers-windows/select-customer/select-customer.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { ReceivablesApiService } from 'projects/shop/src/app/services/modules-api/receivables-api/receivables-api.service';

import { Receivable } from 'projects/shop/src/app/models/modules/receivables/receivables.model';


@Component({
  selector: 'app-edit-receivable',
  templateUrl: './edit-receivable.component.html',
  styleUrls: ['./edit-receivable.component.scss']
})
export class EditReceivableComponent implements OnInit {

  constructor(
    private customCookie: CustomCookieService,
    private receivablesApi: ReceivablesApiService
  ) { }

  @Output() saveItemEvent = new EventEmitter<any>();
  @Output() deleteItemEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('selectCustomerComponentReference', { read: SelectCustomerComponent, static: false }) selectCustomer!: SelectCustomerComponent;

  @ViewChild('receivableFormComponentReference', { read: ReceivableFormComponent, static: false }) receivableForm!: ReceivableFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

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
    this.receivableForm.receivableForm.controls.receivableDate.setValue(data.receivable_date);
    this.receivableForm.receivableForm.controls.dueDate.setValue(data.due_date);
    this.receivableForm.receivableForm.controls.invoiceNumber.setValue(data.invoice_number);
    this.receivableForm.receivableForm.controls.customerName.setValue(data.customer?.customer_name);
    this.receivableForm.receivableForm.controls.amount.setValue(data.amount);
    this.receivableForm.receivableForm.controls.dateReceived.setValue(data.date_received);

    this.receivableForm.selectedCustomerId = data.customer?.id;

    this.editButton.nativeElement.click();

    this.getReceivableCodeConfig();
  }

  saveItem(){
    let data: Receivable = {
      account: this.customCookie.getCookie('shop_id') as string,
      customer: this.receivableForm.selectedCustomerId,
      receivable_code: this.receivableForm.receivableForm.controls.receivableCode.value as string,
      receivable_date: this.receivableForm.receivableForm.controls.receivableDate.value,
      due_date: this.receivableForm.receivableForm.controls.dueDate.value,
      invoice_number: this.receivableForm.receivableForm.controls.invoiceNumber.value as string,
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

  openCustomerWindow(){
    console.log("You are opening select customer window")
    this.selectCustomer.openModal();
  }

  onCustomerSelected(customerData: any){
    console.log(customerData);

    this.receivableForm.selectedCustomerId = customerData.id;
    this.receivableForm.receivableForm.controls.customerName.setValue(customerData.customer_name);
  }

  getReceivableCodeConfig(){
    this.receivablesApi.getReceivableCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.entry_mode == "Auto")
            this.receivableForm.receivableForm.controls.receivableCode.disable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
