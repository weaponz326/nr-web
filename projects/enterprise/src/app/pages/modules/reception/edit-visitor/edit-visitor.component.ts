import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { VisitorFormComponent } from '../visitor-form/visitor-form.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Component({
  selector: 'app-edit-visitor',
  templateUrl: './edit-visitor.component.html',
  styleUrls: ['./edit-visitor.component.scss']
})
export class EditVisitorComponent implements OnInit {

  constructor(private customCookie: CustomCookieService) { }

  @Output() saveVisitorEvent = new EventEmitter<any>();
  @Output() deleteVisitorEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('visitorFormComponentReference', { read: VisitorFormComponent, static: false }) visitorForm!: VisitorFormComponent;

  navHeading: any[] = [
    { text: "All Visitors", url: "/home/kitchen-stock/all-visitors" },
    { text: "View Visitor", url: "/home/kitchen-stock/view-visitor" },
  ];

  visitorData: any;

  isVisitorSaving = false;
  isVisitorDeleting = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.visitorData = data;

    this.visitorForm.visitorForm.controls.visitCode.setValue(data.visit_code);
    this.visitorForm.visitorForm.controls.visitDate.setValue(data.visit_date);
    this.visitorForm.visitorForm.controls.visitorName.setValue(data.visitor_name);
    this.visitorForm.visitorForm.controls.visitorPhone.setValue(data.visitor_phone);
    this.visitorForm.visitorForm.controls.arrival.setValue(data.arrival);
    this.visitorForm.visitorForm.controls.departure.setValue(data.departure);
    this.visitorForm.visitorForm.controls.purpose.setValue(data.purpose);
    this.visitorForm.visitorForm.controls.tagNumber.setValue(data.tag_number);

    this.editButton.nativeElement.click();
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

    let visitor = {
      id: this.visitorData.id,
      data: data
    }

    this.saveVisitorEvent.emit(visitor);
  }

  deleteVisitor(){
    this.deleteVisitorEvent.emit(this.visitorData.id);
  }

}
