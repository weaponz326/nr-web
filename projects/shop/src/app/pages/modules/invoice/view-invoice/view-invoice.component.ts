import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'
import { InvoiceItemsComponent } from '../invoice-items/invoice-items.component';
// import { SelectCustomerComponent } from '../../../../components/select-windows/customers-windows/select-customer/select-customer.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { InvoiceApiService } from 'projects/shop/src/app/services/modules-api/invoice-api/invoice-api.service';
// import { InvoicePrintService } from 'projects/shop/src/app/services/modules-printing/invoice-print/invoice-print.service';

// import { Invoice } from 'projects/shop/src/app/models/modules/invoice/invoice.model';


@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss']
})
export class ViewInvoiceComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private invoiceApi: InvoiceApiService,
    // private invoicePrint: InvoicePrintService
  ) { }

  @ViewChild('existButtonElementReference', { read: ElementRef, static: false }) existButtonElement!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
  @ViewChild('invoiceItemsComponentReference', { read: InvoiceItemsComponent, static: false }) invoiceItems!: InvoiceItemsComponent;

  // @ViewChild('selectCustomerComponentReference', { read: SelectCustomerComponent, static: false }) selectCustomer!: SelectCustomerComponent;

  navHeading: any[] = [
    { text: "All Invoice", url: "/home/invoice/all-invoice" },
    { text: "View Invoice", url: "/home/invoice/view-invoice" },
  ];

  invoiceFormData: any;

  selectedCustomerId = "";
  selectedCustomerName = "";
  selectedTableId = "";

  isInvoiceLoading: boolean = false;
  isInvoiceaving: boolean = false;
  isInvoiceDeleting: boolean = false;
  isCheckingDelivery: boolean = false;

  invoiceForm = new FormGroup({
    invoiceNumber: new FormControl(''),
    invoiceDate: new FormControl(),
    customerName: new FormControl(''),
    customerContact: new FormControl(''),
    dueDate: new FormControl(),
  })

  ngOnInit(): void {
    this.getInvoice();
  }

  getInvoice(){
    this.isInvoiceLoading = true;

    this.invoiceApi.getInvoice()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.invoiceFormData = res;
          this.isInvoiceLoading = false;

          this.invoiceForm.controls.invoiceNumber.setValue(this.invoiceFormData.invoice_number);
          this.invoiceForm.controls.invoiceDate.setValue(new Date(this.invoiceFormData.invoice_date).toISOString().slice(0, 16));
          this.invoiceForm.controls.customerContact.setValue(this.invoiceFormData.customer_contact);
          this.invoiceForm.controls.dueDate.setValue(this.invoiceFormData.due_date);

          this.selectedCustomerId = this.invoiceFormData.customer?.id;
          this.selectedCustomerName = this.invoiceFormData.customer_name;
          this.invoiceForm.controls.customerName.setValue(this.invoiceFormData.customer_name);
        },
        error: (err) => {
          console.log(err);
          this.isInvoiceLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putInvoice(){
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
    this.isInvoiceaving = true;

    this.invoiceApi.putInvoice(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isInvoiceaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isInvoiceaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteInvoice(){
    this.isInvoiceDeleting = true;

    this.invoiceApi.deleteInvoice()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.router.navigateByUrl('/home/invoice/all-invoice');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  openCustomerWindow(){
    console.log("You are opening select customer window")
    // this.selectCustomer.openModal();
  }

  onCustomerSelected(customerData: any){
    console.log(customerData);

    this.invoiceForm.controls.customerName.setValue(customerData.customer_name);
    this.selectedCustomerId = customerData.id;
  }  

  onPrint(){
    console.log("lets start printing...");
    // this.invoicePrint.printViewInvoice();
  }

  onPrintRoll(){
    console.log("lets start printing roll...");
    // this.invoicePrint.printInvoiceRoll();
  }
  
}
