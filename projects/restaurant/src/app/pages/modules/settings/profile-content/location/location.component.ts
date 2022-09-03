import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  constructor() { }

  @Output() updateAccountEvent = new EventEmitter<any>;
  @Output() updateExtendedEvent = new EventEmitter<any>;

  isAccountLoading = false;
  isExtendedProfileLoading = false;
  isAccountSaving = false;
  isExtendedProfileSaving = false;

  locationForm = new FormGroup({
    location: new FormControl(),
    country: new FormControl(),
    state: new FormControl(),
    city: new FormControl(),
  })

  ngOnInit(): void {
  }

  updateLocation(){
    let userData = {
      location: this.locationForm.controls.location.value,
    }

    let extendedData = {
      country: this.locationForm.controls.country.value,
      state: this.locationForm.controls.state.value,
      city: this.locationForm.controls.city.value,
    }

    this.updateAccountEvent.emit(userData);
    this.updateExtendedEvent.emit(extendedData);
  }

  onAddressChange(address: any) {
    this.locationForm.controls.location.setValue(address.formatted_address);
    console.log(address);
  }
  
}
