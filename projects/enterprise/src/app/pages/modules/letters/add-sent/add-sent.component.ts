import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { SentFormComponent } from '../sent-form/sent-form.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { SentLetter } from 'projects/enterprise/src/app/models/modules/letters/letters.model';


@Component({
  selector: 'app-add-sent',
  templateUrl: './add-sent.component.html',
  styleUrls: ['./add-sent.component.scss']
})
export class AddSentComponent implements OnInit {

  constructor(private customCookie: CustomCookieService) { }

  @Output() saveSentEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('sentFormComponentReference', { read: SentFormComponent, static: false }) sentForm!: SentFormComponent;

  isSaving = false;

  ngOnInit(): void {
  }

  openModal(){
    this.addButton.nativeElement.click();
  }

  saveSent(){
    let data: SentLetter = {
      account: this.customCookie.getCookie('enterprise_id') as string,
      date_sent: this.sentForm.sentForm.controls.dateSent.value,
      reference_number: this.sentForm.sentForm.controls.referenceNumber.value as string,
      recepient: this.sentForm.sentForm.controls.recepient.value as string,
      subject: this.sentForm.sentForm.controls.subject.value as string,
    }

    this.saveSentEvent.emit(data);
  }

  resetForm(){
    this.sentForm.sentForm.controls.dateSent.setValue('');
    this.sentForm.sentForm.controls.referenceNumber.setValue('');
    this.sentForm.sentForm.controls.recepient.setValue('');
    this.sentForm.sentForm.controls.subject.setValue('');
  }

}
