import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { SalesFormComponent } from '../sales-form/sales-form.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { Sales } from 'projects/shop/src/app/models/modules/sales/sales.model';


@Component({
  selector: 'app-edit-sales',
  templateUrl: './edit-sales.component.html',
  styleUrls: ['./edit-sales.component.scss']
})
export class EditSalesComponent implements OnInit {

  constructor(private customCookie: CustomCookieService) { }

  @Output() saveItemEvent = new EventEmitter<any>();
  @Output() deleteItemEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('salesFormComponentReference', { read: SalesFormComponent, static: false }) salesForm!: SalesFormComponent;

  navHeading: any[] = [
    { text: "All Items", url: "/home/sales/all-sales" },
    { text: "View Item", url: "/home/sales/view-sales" },
  ];

  salesData: any;

  isItemSaving = false;
  isItemDeleting = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.salesData = data;

    this.salesForm.salesForm.controls.salesCode.setValue(data.sales_code);
    this.salesForm.salesForm.controls.salesDate.setValue(data.recevable_date);
    this.salesForm.salesForm.controls.productCode.setValue(data?.product?.product_code);
    this.salesForm.salesForm.controls.productName.setValue(data?.product?.product_name);
    this.salesForm.salesForm.controls.unitPrice.setValue(data.unit_price);
    this.salesForm.salesForm.controls.quantity.setValue(data.quantity);
    this.salesForm.salesForm.controls.totalPrice.setValue(data.total_price);
    this.salesForm.salesForm.controls.customerName.setValue(data.customer_name);

    this.editButton.nativeElement.click();
  }

  saveItem(){
    // let data: Sales = {
    let data = {
      account: this.customCookie.getCookie('shop_id') as string,
      recevable_code: this.salesForm.salesForm.controls.salesCode.value as string,
      recevable_date: this.salesForm.salesForm.controls.salesDate.value,
      productCode: this.salesForm.salesForm.controls.productCode.value as string,
      productName: this.salesForm.salesForm.controls.productName.value as string,
      unit_price: this.salesForm.salesForm.controls.unitPrice.value as number,
      quantity: this.salesForm.salesForm.controls.quantity.value as number,
      total_price: this.salesForm.salesForm.controls.totalPrice.value as number,
      customer_name: this.salesForm.salesForm.controls.customerName.value as string,
    }

    let item = {
      id: this.salesData.id,
      data: data
    }

    this.saveItemEvent.emit(item);
  }

  deleteItem(){
    this.deleteItemEvent.emit(this.salesData.id);
  }

}
