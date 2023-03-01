import { Component, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { BasicComponent } from '../profile-content/basic/basic.component';
import { ContactComponent } from '../profile-content/contact/contact.component';
import { LocationComponent } from '../profile-content/location/location.component';
import { LogoComponent } from '../profile-content/logo/logo.component';

import { environment } from 'projects/shop/src/environments/environment';
import { AccountApiService } from 'projects/shop/src/app/services/account-api/account-api.service';
import { SettingsApiService } from 'projects/shop/src/app/services/modules-api/settings-api/settings-api.service';


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
    this.getAccount();
    this.getExtendedProfile();
  }

  getAccount(){
    // this.basic.isAccountLoading = true;
    // this.logo.isAccountLoading = true;

    this.accountApi.getAccount()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.contact.contactForm.controls.email.setValue(res.email);
          this.basic.basicForm.controls.name.setValue(res.name);
          this.basic.basicForm.controls.about.setValue(res.about);
          this.location.locationForm.controls.location.setValue(res.location);
          if(res.logo != null) this.logo.imageInput.imgSrc = environment.apiUrl + 'shop-accounts' + res.logo;

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
    // this.location.isExtendedProfileLoading = true;
    // this.contact.isExtendedProfileLoading = true;

    this.settingsApi.getExtendedProfile()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.extendedProfileData = res;

          this.location.locationForm.controls.country.setValue(res.country);
          this.location.locationForm.controls.state.setValue(res.state);
          this.location.locationForm.controls.city.setValue(res.city);
          this.contact.contactForm.controls.phone.setValue(res.phone);
          this.contact.contactForm.controls.address.setValue(res.address);

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

  putAccount(data: any){
    console.log(data);

    this.basic.isAccountSaving = true;

    this.accountApi.putAccount(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.basic.isAccountSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
          this.basic.isAccountSaving = false;
        }
      })    
  }

  putLogo(data: any){
    console.log(data);

    this.logo.isAccountSaving = true;

    this.accountApi.putLogo(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.logo.isAccountSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
          this.logo.isAccountSaving = false;
        }
      })    
  }


  putExtended(data: any){
    console.log(data);

    this.location.isExtendedProfileSaving = true;
    this.contact.isExtendedProfileSaving = true;

    this.settingsApi.putExtendedProfile(data)
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
