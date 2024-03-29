import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';

import { SentFormComponent } from '../sent-form/sent-form.component';
import { SentLetter } from 'projects/enterprise/src/app/models/modules/letters/letters.model';


@Component({
  selector: 'app-edit-sent',
  templateUrl: './edit-sent.component.html',
  styleUrls: ['./edit-sent.component.scss']
})
export class EditSentComponent implements OnInit {

  constructor(private customCookie: CustomCookieService) { }

  @Output() saveSentEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('sentFormComponentReference', { read: SentFormComponent, static: false }) sentForm!: SentFormComponent;

  sentFormData: any;

  isSaving = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.sentFormData = data;

    this.sentForm.sentForm.controls.dateSent.setValue(this.sentFormData.date_sent);
    this.sentForm.sentForm.controls.referenceNumber.setValue(this.sentFormData.reference_number);
    this.sentForm.sentForm.controls.recepient.setValue(this.sentFormData.recepient);
    this.sentForm.sentForm.controls.subject.setValue(this.sentFormData.subject);

    this.editButton.nativeElement.click();
  }

  saveSent(){
    let data: SentLetter = {
      account: this.customCookie.getCookie('enterprise_id') as string,
      date_sent: this.sentForm.sentForm.controls.dateSent.value,
      reference_number: this.sentForm.sentForm.controls.referenceNumber.value as string,
      recepient: this.sentForm.sentForm.controls.recepient.value as string,
      subject: this.sentForm.sentForm.controls.subject.value as string,
    }

    let sent = {
      id: this.sentFormData.id,
      data: data
    }
    
    this.saveSentEvent.emit(sent);
  }

  resetForm(){
    this.sentForm.sentForm.controls.dateSent.setValue('');
    this.sentForm.sentForm.controls.referenceNumber.setValue('');
    this.sentForm.sentForm.controls.recepient.setValue('');
    this.sentForm.sentForm.controls.subject.setValue('');
  }

}
