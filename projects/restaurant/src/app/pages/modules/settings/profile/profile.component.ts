import { Component, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { BasicComponent } from '../profile-content/basic/basic.component';
import { ContactComponent } from '../profile-content/contact/contact.component';
import { LocationComponent } from '../profile-content/location/location.component';
import { LogoComponent } from '../profile-content/logo/logo.component';

import { AccountApiService } from 'projects/restaurant/src/app/services/account-api/account-api.service';
import { SettingsApiService } from 'projects/restaurant/src/app/services/modules-api/settings-api/settings-api.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private accountApi: AccountApiService,
    private settingsApi: SettingsApiService,
  ) { }

  @ViewChild('basicComponentReference') basic!: BasicComponent;
  @ViewChild('logoComponentReference') logo!: LogoComponent;
  @ViewChild('locationComponentReference') location!: LocationComponent;
  @ViewChild('contactComponentReference') contact!: ContactComponent;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Profile", url: "/home/profile/dashboard" },
  ];

  userData: any;
  extendedProfileData: any;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getAuth();
    this.getExtendedProfile();
  }

  getAuth(){
    this.basic.isAccountLoading = true;
    this.logo.isAccountLoading = true;

    this.accountApi.getAccount()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.contact.contactForm.controls.email.setValue(res.email);
          this.basic.basicForm.controls.name.setValue(res.name);
          this.basic.basicForm.controls.about.setValue(res.about);
          this.location.locationForm.controls.location.setValue(res.location);
          if(res.logo != null) this.logo.imageInput.imgSrc = res.logo;

          this.basic.isAccountLoading = false;
          this.logo.isAccountLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();

          this.basic.isAccountLoading = false;
          this.logo.isAccountLoading = false;
        }
      })
  }

  getExtendedProfile(){
    this.location.isExtendedProfileLoading = true;
    this.contact.isExtendedProfileLoading = true;

    this.settingsApi.getExtendedProfile()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.extendedProfileData = res;

          this.location.locationForm.controls.country.setValue(this.extendedProfileData.country);
          this.location.locationForm.controls.state.setValue(this.extendedProfileData.state);
          this.location.locationForm.controls.city.setValue(this.extendedProfileData.city);
          this.contact.contactForm.controls.phone.setValue(this.extendedProfileData.phone);
          this.contact.contactForm.controls.address.setValue(this.extendedProfileData.address);

          this.location.isExtendedProfileLoading = false;
          this.contact.isExtendedProfileLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();

          this.location.isExtendedProfileLoading = false;
          this.contact.isExtendedProfileLoading = false;
        }
      })
  }

  updateAccount(data: any){
    console.log(data);

    this.basic.isAccountSaving = true;
    this.logo.isAccountSaving = true;

    this.accountApi.patchAccount(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.basic.isAccountSaving = false;
          this.logo.isAccountSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();

          this.basic.isAccountSaving = false;
          this.logo.isAccountSaving = false;
        }
      })    
  }

  updateExtended(data: any){
    console.log(data);

    this.location.isExtendedProfileSaving = true;
    this.contact.isExtendedProfileSaving = true;

    this.settingsApi.patchExtendedProfile(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.location.isExtendedProfileSaving = false;
          this.contact.isExtendedProfileSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();

          this.location.isExtendedProfileSaving = false;
          this.contact.isExtendedProfileSaving = false;
        }
      })
  }

}
