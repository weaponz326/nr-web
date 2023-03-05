import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { PayableFormComponent } from '../payable-form/payable-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { SelectSupplierComponent } from '../../../../components/select-windows/suppliers-windows/select-supplier/select-supplier.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { PayablesApiService } from 'projects/shop/src/app/services/modules-api/payables-api/payables-api.service';

import { Payable } from 'projects/shop/src/app/models/modules/payables/payables.model';


@Component({
  selector: 'app-add-payable',
  templateUrl: './add-payable.component.html',
  styleUrls: ['./add-payable.component.scss']
})
export class AddPayableComponent implements OnInit {

  constructor(
    private customCookie: CustomCookieService,
    private payablesApi: PayablesApiService
  ) { }

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('selectSupplierComponentReference', { read: SelectSupplierComponent, static: false }) selectSupplier!: SelectSupplierComponent;

  @ViewChild('payableFormComponentReference', { read: PayableFormComponent, static: false }) payableForm!: PayableFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isItemSaving = false;

  ngOnInit(): void {
  }

  getNewPayableCodeConfig(){
    // this.payableForm.payableForm.controls.payableCode.disable();

    // this.payablesApi.getNewPayableCodeConfig()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       if(res.code)
    //         this.payableForm.payableForm.controls.itemCode.setValue(res.code);
    //       else
    //         this.payableForm.payableForm.controls.itemCode.enable();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }
  
  openModal(){
    this.addButton.nativeElement.click();
    this.payableForm.payableForm.controls.payableDate.setValue(new Date().toISOString().slice(0, 10));
    this.getNewPayableCodeConfig();
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

    this.saveItemEvent.emit(data);
  }

  resetForm(){
    this.payableForm.payableForm.controls.payableCode.setValue('');
    this.payableForm.payableForm.controls.payableDate.setValue('');
    this.payableForm.payableForm.controls.dueDate.setValue('');
    this.payableForm.payableForm.controls.invoiceNumber.setValue('');
    this.payableForm.payableForm.controls.supplierName.setValue('');
    this.payableForm.payableForm.controls.amount.setValue(0.00);
    this.payableForm.payableForm.controls.datePaid.setValue('');
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

}
