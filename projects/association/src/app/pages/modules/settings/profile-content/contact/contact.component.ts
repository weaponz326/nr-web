import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor() { }

  @Output() updateExtendedEvent = new EventEmitter<any>;

  isExtendedProfileLoading = false;
  isExtendedProfileSaving = false;

  contactForm = new FormGroup({
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
  })

  ngOnInit(): void {
  }

  updateExtendedProfile(){
    let data = {
      email: this.contactForm.controls.email.value,
      phone: this.contactForm.controls.phone.value,
      address: this.contactForm.controls.address.value,
    }

    this.updateExtendedEvent.emit(data);
  }

}
