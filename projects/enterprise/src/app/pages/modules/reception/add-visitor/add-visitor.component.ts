import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { VisitorFormComponent } from '../visitor-form/visitor-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { KitchenStockApiService } from 'projects/restaurant/src/app/services/modules-api/kitchen-stock-api/kitchen-stock-api.service';


@Component({
  selector: 'app-add-visitor',
  templateUrl: './add-visitor.component.html',
  styleUrls: ['./add-visitor.component.scss']
})
export class AddVisitorComponent implements OnInit {

  constructor(
    private customCookie: CustomCookieService,
    private kitchenStockApi: KitchenStockApiService
  ) { }

  @Output() saveVisitorEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('visitorFormComponentReference', { read: VisitorFormComponent, static: false }) visitorForm!: VisitorFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isVisitorSaving = false;

  ngOnInit(): void {
  }

  getNewVisitorCodeConfig(){
    this.visitorForm.visitorForm.controls.visitCode.disable();

    // this.visitorApi.getNewVisitorCodeConfig()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       if(res.code)
    //         this.visitorForm.visitorForm.controls.visitCode.setValue(res.code);
    //       else
    //         this.visitorForm.visitorForm.controls.visitCode.enable();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }
  
  openModal(){
    this.addButton.nativeElement.click();
    this.getNewVisitorCodeConfig();
    this.visitorForm.visitorForm.controls.visitDate.setValue(new Date().toISOString().slice(0, 16));
  }

  saveVisitor(){
    let data = {
      account: this.customCookie.getCookie('enterprise_id') as string,
      visit_code: this.visitorForm.visitorForm.controls.visitCode.value as string,
      visit_date: this.visitorForm.visitorForm.controls.visitDate.value,
      visitor_name: this.visitorForm.visitorForm.controls.visitorName.value as string,
      visitor_phone: this.visitorForm.visitorForm.controls.visitorPhone.value as string,
      arrival: this.visitorForm.visitorForm.controls.arrival.value,
      departure: this.visitorForm.visitorForm.controls.departure.value,
      purpose: this.visitorForm.visitorForm.controls.purpose.value as string,
      tag_number: this.visitorForm.visitorForm.controls.tagNumber.value as string,
    }

    this.saveVisitorEvent.emit(data);
  }

  resetForm(){
    this.visitorForm.visitorForm.controls.visitCode.setValue('');
    this.visitorForm.visitorForm.controls.visitDate.setValue(new Date().toISOString().slice(0, 16));
    this.visitorForm.visitorForm.controls.visitorName.setValue('');
    this.visitorForm.visitorForm.controls.visitorPhone.setValue('');
    this.visitorForm.visitorForm.controls.arrival.setValue(null);
    this.visitorForm.visitorForm.controls.departure.setValue(null);
    this.visitorForm.visitorForm.controls.purpose.setValue('');
    this.visitorForm.visitorForm.controls.tagNumber.setValue('');
  }
  
}
