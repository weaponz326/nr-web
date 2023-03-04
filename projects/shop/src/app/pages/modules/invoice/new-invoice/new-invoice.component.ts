import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { InvoiceApiService } from 'projects/shop/src/app/services/modules-api/invoice-api/invoice-api.service';

// import { Invoice } from 'projects/shop/src/app/models/modules/invoice/invoice.model';


@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss']
})
export class NewInvoiceComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    // private invoiceApi: InvoiceApiService,
  ) { }

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  selectedCustomerId = "";
  selectedCustomerName = "";
  selectedTableId = "";

  isInvoiceSaving = false;

  invoiceForm = new FormGroup({
    invoiceNumber: new FormControl(''),
    invoiceDate: new FormControl(),
    customerName: new FormControl(''),
    customerContact: new FormControl(''),
    dueDate: new FormControl(),
  })

  ngOnInit(): void {
  }

  openModal(){
    this.newButton.nativeElement.click();
    this.invoiceForm.controls.invoiceDate.setValue(new Date().toISOString().slice(0, 16));
    this.getNewInvoiceCodeConfig();
  }

  createInvoice(){
    var customerName = "";

    if(this.selectedCustomerName != ""){
      customerName = this.selectedCustomerName;
    }
    else{
      customerName = this.invoiceForm.controls.customerName.value as string;
    }

    // let data: Invoice = {
    let data = {
      account: this.customCookie.getCookie('shop_id') as string,
      customer: this.selectedCustomerId,
      customer_name: customerName,
      invoice_number: this.invoiceForm.controls.invoiceNumber.value as string,
      invoice_date: this.invoiceForm.controls.invoiceDate.value as string,
      due_date: this.invoiceForm.controls.dueDate.value as string,
      total_amount: 0,
      invoice_status: "",
    }

    console.log(data);
    this.isInvoiceSaving = true;

    // this.invoiceApi.postInvoice(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       if(res.id){
    //         sessionStorage.setItem('shop_invoice_id', res.id);

    //         this.dismissButton.nativeElement.click();
    //         this.isInvoiceSaving = false;
    //         this.router.navigateByUrl('/home/invoice/view-invoice');
    //       }
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isInvoiceSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   })

    console.log(data);
  }

  getNewInvoiceCodeConfig(){
    this.invoiceForm.controls.invoiceNumber.disable();

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

}
