import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { PayableFormComponent } from '../payable-form/payable-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { SelectSupplierComponent } from '../../../../components/select-windows/suppliers-windows/select-supplier/select-supplier.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { PayablesApiService } from 'projects/shop/src/app/services/modules-api/payables-api/payables-api.service';

import { Payable } from 'projects/shop/src/app/models/modules/payables/payables.model';


@Component({
  selector: 'app-edit-payable',
  templateUrl: './edit-payable.component.html',
  styleUrls: ['./edit-payable.component.scss']
})
export class EditPayableComponent implements OnInit {

  constructor(
    private customCookie: CustomCookieService,
    private payablesApi: PayablesApiService
  ) { }

  @Output() saveItemEvent = new EventEmitter<any>();
  @Output() deleteItemEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('selectSupplierComponentReference', { read: SelectSupplierComponent, static: false }) selectSupplier!: SelectSupplierComponent;

  @ViewChild('payableFormComponentReference', { read: PayableFormComponent, static: false }) payableForm!: PayableFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

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
    this.payableForm.payableForm.controls.supplierName.setValue(data.supplier?.supplier_name);
    this.payableForm.payableForm.controls.amount.setValue(data.amount);
    this.payableForm.payableForm.controls.datePaid.setValue(data.date_paid);

    this.payableForm.selectedSupplierId = data.supplier?.id;

    this.editButton.nativeElement.click();

    this.getPayableCodeConfig();
  }

  saveItem(){
    let data: Payable = {
      account: this.customCookie.getCookie('shop_id') as string,
      supplier: this.payableForm.selectedSupplierId,
      payable_code: this.payableForm.payableForm.controls.payableCode.value as string,
      payable_date: this.payableForm.payableForm.controls.payableDate.value,
      due_date: this.payableForm.payableForm.controls.dueDate.value,
      invoice_number: this.payableForm.payableForm.controls.invoiceNumber.value as string,
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

  openSupplierWindow(){
    console.log("You are opening select supplier window")
    this.selectSupplier.openModal();
  }

  onSupplierSelected(supplierData: any){
    console.log(supplierData);

    this.payableForm.selectedSupplierId = supplierData.id;
    this.payableForm.payableForm.controls.supplierName.setValue(supplierData.supplier_name);
  }

  getPayableCodeConfig(){
    this.payablesApi.getPayableCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.entry_mode == "Auto")
            this.payableForm.payableForm.controls.payableCode.disable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }
  
}
