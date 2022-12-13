import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { ReceivedFormComponent } from '../received-form/received-form.component';


@Component({
  selector: 'app-edit-received',
  templateUrl: './edit-received.component.html',
  styleUrls: ['./edit-received.component.scss']
})
export class EditReceivedComponent implements OnInit {

  constructor() { }

  @Output() saveReceivedEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('receivedFormComponentReference', { read: ReceivedFormComponent, static: false }) receivedForm!: ReceivedFormComponent;

  receivedFormData: any;

  isSaving = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.receivedFormData = data;

    this.receivedForm.receivedForm.controls.dateReceived.setValue(new Date(this.receivedFormData.date_received).toISOString().slice(0, 16));
    this.receivedForm.receivedForm.controls.referenceNumber.setValue(this.receivedFormData.reference_number);
    this.receivedForm.receivedForm.controls.sender.setValue(this.receivedFormData.sender);
    this.receivedForm.receivedForm.controls.subject.setValue(this.receivedFormData.subject);

    this.editButton.nativeElement.click();
  }

  saveReceived(){
    // let data: Received = {
    let data = {
      dateReceived: this.receivedForm.receivedForm.controls.dateReceived.value,
      reference_number: this.receivedForm.receivedForm.controls.referenceNumber.value as string,
      sender: this.receivedForm.receivedForm.controls.sender.value as string,
      subject: this.receivedForm.receivedForm.controls.subject.value as string,
    }

    let received = {
      id: this.receivedFormData.id,
      data: data
    }
    
    this.saveReceivedEvent.emit(data);
  }

  resetForm(){
    this.receivedForm.receivedForm.controls.dateReceived.setValue('');
    this.receivedForm.receivedForm.controls.referenceNumber.setValue('');
    this.receivedForm.receivedForm.controls.sender.setValue('');
    this.receivedForm.receivedForm.controls.subject.setValue('');
  }

}
