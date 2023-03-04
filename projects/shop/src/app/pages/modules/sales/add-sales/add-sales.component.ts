import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { SalesFormComponent } from '../sales-form/sales-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { SalesApiService } from 'projects/shop/src/app/services/modules-api/sales-api/sales-api.service';

// import { Sales } from 'projects/shop/src/app/models/modules/sales/sales.model';


@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.scss']
})
export class AddSalesComponent implements OnInit {

  constructor(
    private customCookie: CustomCookieService,
    private salesApi: SalesApiService
  ) { }

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('salesFormComponentReference', { read: SalesFormComponent, static: false }) salesForm!: SalesFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isItemSaving = false;

  ngOnInit(): void {
  }

  getNewSalesCodeConfig(){
    this.salesForm.salesForm.controls.salesCode.disable();

    // this.salesApi.getNewSalesCodeConfig()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       if(res.code)
    //         this.salesForm.salesForm.controls.itemCode.setValue(res.code);
    //       else
    //         this.salesForm.salesForm.controls.itemCode.enable();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }
  
  openModal(){
    this.addButton.nativeElement.click();
    this.getNewSalesCodeConfig();
  }

  saveItem(){
    // let data: Sales = {
    let data = {
      account: this.customCookie.getCookie('shop_id') as string,
      sales_code: this.salesForm.salesForm.controls.salesCode.value as string,
      sales_date: this.salesForm.salesForm.controls.salesDate.value,
      productCode: this.salesForm.salesForm.controls.productCode.value as string,
      productName: this.salesForm.salesForm.controls.productName.value as string,
      unit_price: this.salesForm.salesForm.controls.unitPrice.value as number,
      quantity: this.salesForm.salesForm.controls.quantity.value as number,
      total_price: this.salesForm.salesForm.controls.totalPrice.value as number,
      customer_name: this.salesForm.salesForm.controls.customerName.value as string,
    }

    this.saveItemEvent.emit(data);
  }

  resetForm(){
    this.salesForm.salesForm.controls.salesCode.setValue('');
    this.salesForm.salesForm.controls.salesDate.setValue('');
    this.salesForm.salesForm.controls.productCode.setValue('');
    this.salesForm.salesForm.controls.productName.setValue('');
    this.salesForm.salesForm.controls.unitPrice.setValue(0.00);
    this.salesForm.salesForm.controls.quantity.setValue(1);
    this.salesForm.salesForm.controls.totalPrice.setValue(0.00);
    this.salesForm.salesForm.controls.customerName.setValue('');
  }

}
