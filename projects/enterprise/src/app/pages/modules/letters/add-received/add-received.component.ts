import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';

import { ReceivedFormComponent } from '../received-form/received-form.component';
import { ReceivedLetter } from 'projects/enterprise/src/app/models/modules/letters/letters.model';


@Component({
  selector: 'app-add-received',
  templateUrl: './add-received.component.html',
  styleUrls: ['./add-received.component.scss']
})
export class AddReceivedComponent implements OnInit {

  constructor(private customCookie: CustomCookieService) { }

  @Output() saveReceivedEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('receivedFormComponentReference', { read: ReceivedFormComponent, static: false }) receivedForm!: ReceivedFormComponent;

  isSaving = false;

  ngOnInit(): void {
  }

  openModal(){
    this.addButton.nativeElement.click();
  }

  saveReceived(){
    let data: ReceivedLetter = {
      account: this.customCookie.getCookie('enterprise_id') as string,
      date_received: this.receivedForm.receivedForm.controls.dateReceived.value,
      reference_number: this.receivedForm.receivedForm.controls.referenceNumber.value as string,
      sender: this.receivedForm.receivedForm.controls.sender.value as string,
      subject: this.receivedForm.receivedForm.controls.subject.value as string,
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
