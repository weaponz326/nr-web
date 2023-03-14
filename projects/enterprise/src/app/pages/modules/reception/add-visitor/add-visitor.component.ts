import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { VisitorFormComponent } from '../visitor-form/visitor-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { ReceptionApiService } from 'projects/enterprise/src/app/services/modules-api/reception-api/reception-api.service';

import { Visitor } from 'projects/enterprise/src/app/models/modules/reception/reception.model';


@Component({
  selector: 'app-add-visitor',
  templateUrl: './add-visitor.component.html',
  styleUrls: ['./add-visitor.component.scss']
})
export class AddVisitorComponent implements OnInit {

  constructor(
    private customCookie: CustomCookieService,
    private receptionApi: ReceptionApiService
  ) { }

  @Output() saveVisitorEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('visitorFormComponentReference', { read: VisitorFormComponent, static: false }) visitorForm!: VisitorFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isVisitorSaving = false;

  ngOnInit(): void {
  }

  getNewVisitCodeConfig(){
    this.receptionApi.getNewVisitCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.code){
            this.visitorForm.visitorForm.controls.visitCode.setValue(res.code);
            this.visitorForm.visitorForm.controls.visitCode.disable();
          }
          else{
            this.visitorForm.visitorForm.controls.visitCode.enable();
          }
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }
  
  openModal(){
    this.addButton.nativeElement.click();
    this.getNewVisitCodeConfig();
    this.visitorForm.visitorForm.controls.visitDate.setValue(new Date().toISOString().slice(0, 10));
  }

  saveVisitor(){
    let data: Visitor = {
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
    this.visitorForm.visitorForm.controls.visitDate.setValue(new Date().toISOString().slice(0, 10));
    this.visitorForm.visitorForm.controls.visitorName.setValue('');
    this.visitorForm.visitorForm.controls.visitorPhone.setValue('');
    this.visitorForm.visitorForm.controls.arrival.setValue(null);
    this.visitorForm.visitorForm.controls.departure.setValue(null);
    this.visitorForm.visitorForm.controls.purpose.setValue('');
    this.visitorForm.visitorForm.controls.tagNumber.setValue('');
  }
  
}
