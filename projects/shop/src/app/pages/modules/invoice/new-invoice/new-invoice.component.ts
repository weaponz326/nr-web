import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { SelectCustomerComponent } from '../../../../components/select-windows/customers-windows/select-customer/select-customer.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { InvoiceApiService } from 'projects/shop/src/app/services/modules-api/invoice-api/invoice-api.service';

import { Invoice } from 'projects/shop/src/app/models/modules/invoice/invoice.model';


@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss']
})
export class NewInvoiceComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private invoiceApi: InvoiceApiService,
  ) { }

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('selectCustomerComponentReference', { read: SelectCustomerComponent, static: false }) selectCustomer!: SelectCustomerComponent;

  selectedCustomerId = "";

  isInvoiceSaving = false;

  invoiceForm = new FormGroup({
    invoiceNumber: new FormControl(''),
    invoiceDate: new FormControl(),
    customerName: new FormControl({value: '', disabled: true}),
    customerContact: new FormControl({value: '', disabled: true}),
    dueDate: new FormControl(),
  })

  ngOnInit(): void {
  }

  openModal(){
    this.newButton.nativeElement.click();
    this.invoiceForm.controls.invoiceDate.setValue(new Date().toISOString().slice(0, 10));
    this.getNewInvoiceCodeConfig();
  }

  createInvoice(){
    let data: Invoice = {
      account: this.customCookie.getCookie('shop_id') as string,
      customer: this.selectedCustomerId,
      invoice_number: this.invoiceForm.controls.invoiceNumber.value as string,
      invoice_date: this.invoiceForm.controls.invoiceDate.value,
      due_date: this.invoiceForm.controls.dueDate.value,
      total_amount: 0,
      invoice_status: "",
    }

    console.log(data);
    this.isInvoiceSaving = true;

    this.invoiceApi.postInvoice(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            sessionStorage.setItem('shop_invoice_id', res.id);

            this.dismissButton.nativeElement.click();
            this.isInvoiceSaving = false;
            this.router.navigateByUrl('/home/invoice/view-invoice');
          }
        },
        error: (err) => {
          console.log(err);
          this.isInvoiceSaving = false;
          this.connectionToast.openToast();
        }
      })

    console.log(data);
  }

  getNewInvoiceCodeConfig(){
    // this.invoiceForm.controls.invoiceNumber.disable();

    // this.invoiceApi.getNewInvoiceCodeConfig()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       if(res.code)
    //         this.invoiceForm.controls.invoiceNumber.setValue(res.code);
    //       else
    //         this.invoiceForm.controls.invoiceNumber.enable();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  openCustomerWindow(){
    console.log("You are opening select customer window")
    this.selectCustomer.openModal();
  }

  onCustomerSelected(customerData: any){
    console.log(customerData);

    this.selectedCustomerId = customerData.id;
    this.invoiceForm.controls.customerName.setValue(customerData.customer_name);
    this.invoiceForm.controls.customerContact.setValue(customerData.phone);
  }

}
