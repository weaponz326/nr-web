import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { ReceivableFormComponent } from '../receivable-form/receivable-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { ReceivablesApiService } from 'projects/shop/src/app/services/modules-api/receivables-api/receivables-api.service';

// import { Receivable } from 'projects/shop/src/app/models/modules/receivables/receivables.model';


@Component({
  selector: 'app-add-receivable',
  templateUrl: './add-receivable.component.html',
  styleUrls: ['./add-receivable.component.scss']
})
export class AddReceivableComponent implements OnInit {

  constructor(
    private customCookie: CustomCookieService,
    // private receivablesApi: ReceivablesApiService
  ) { }

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('receivableFormComponentReference', { read: ReceivableFormComponent, static: false }) receivableForm!: ReceivableFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isItemSaving = false;

  ngOnInit(): void {
  }

  getNewReceivableCodeConfig(){
    this.receivableForm.receivableForm.controls.receivableCode.disable();

    // this.receivablesApi.getNewReceivableCodeConfig()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       if(res.code)
    //         this.receivableForm.receivableForm.controls.itemCode.setValue(res.code);
    //       else
    //         this.receivableForm.receivableForm.controls.itemCode.enable();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }
  
  openModal(){
    this.addButton.nativeElement.click();
    this.getNewReceivableCodeConfig();
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

    this.saveItemEvent.emit(data);
  }

  resetForm(){
    this.receivableForm.receivableForm.controls.receivableCode.setValue('');
    this.receivableForm.receivableForm.controls.receivableDate.setValue('');
    this.receivableForm.receivableForm.controls.dueDate.setValue('');
    this.receivableForm.receivableForm.controls.invoiceNumber.setValue('');
    this.receivableForm.receivableForm.controls.customerName.setValue('');
    this.receivableForm.receivableForm.controls.amount.setValue(0.00);
    this.receivableForm.receivableForm.controls.dateReceived.setValue('');
  }


}
