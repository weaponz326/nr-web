import { Component, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { AdditionalComponent } from '../profile-content/additional/additional.component';
import { BasicComponent } from '../profile-content/basic/basic.component';
import { ContactComponent } from '../profile-content/contact/contact.component';
import { LocationComponent } from '../profile-content/location/location.component';
import { PhotoComponent } from '../profile-content/photo/photo.component';

import { AuthApiService } from 'projects/personal/src/app/services/auth/auth-api/auth-api.service';
import { SettingsApiService } from 'projects/personal/src/app/services/modules-api/settings-api/settings-api.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private authApi: AuthApiService,
    private settingsApi: SettingsApiService,
  ) { }

  @ViewChild('basicComponentReference') basic!: BasicComponent;
  @ViewChild('additionalComponentReference') additional!: AdditionalComponent;
  @ViewChild('photoComponentReference') photo!: PhotoComponent;
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
    this.basic.isUserLoading = true;
    this.photo.isUserLoading = true;

    this.authApi.getUser()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.contact.contactForm.controls.email.setValue(res.email);
          this.basic.basicForm.controls.firstName.setValue(res.first_name);
          this.basic.basicForm.controls.lastName.setValue(res.last_name);
          this.basic.basicForm.controls.about.setValue(res.about);
          this.location.locationForm.controls.location.setValue(res.location);
          if(res.photo != null) this.photo.imageInput.imgSrc = res.photo;

          this.basic.isUserLoading = false;
          this.photo.isUserLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();

          this.basic.isUserLoading = false;
          this.photo.isUserLoading = false;
        }
      })
  }

  getExtendedProfile(){
    this.additional.isExtendedProfileLoading = true;
    this.location.isExtendedProfileLoading = true;
    this.contact.isExtendedProfileLoading = true;

    this.settingsApi.getExtendedProfile()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.extendedProfileData = res;

          this.additional.bdayInput.setValue(this.extendedProfileData.date_of_birth);
          this.additional.additionalForm.controls.gender.setValue(this.extendedProfileData.gender);
          this.location.locationForm.controls.country.setValue(this.extendedProfileData.country);
          this.location.locationForm.controls.state.setValue(this.extendedProfileData.state);
          this.location.locationForm.controls.city.setValue(this.extendedProfileData.city);
          this.contact.contactForm.controls.phone.setValue(this.extendedProfileData.phone);
          this.contact.contactForm.controls.address.setValue(this.extendedProfileData.address);

          this.additional.isExtendedProfileLoading = false;
          this.location.isExtendedProfileLoading = false;
          this.contact.isExtendedProfileLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();

          this.additional.isExtendedProfileLoading = false;
          this.location.isExtendedProfileLoading = false;
          this.contact.isExtendedProfileLoading = false;
        }
      })
  }

  updateUser(data: any){
    console.log(data);

    this.basic.isUserSaving = true;
    this.photo.isUserSaving = true;

    this.authApi.patchUser(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.basic.isUserSaving = false;
          this.photo.isUserSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();

          this.basic.isUserSaving = false;
          this.photo.isUserSaving = false;
        }
      })    
  }

  updateExtended(data: any){
    console.log(data);

    this.additional.isExtendedProfileSaving = true;
    this.location.isExtendedProfileSaving = true;
    this.contact.isExtendedProfileSaving = true;

    this.settingsApi.putExtendedProfile(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.additional.isExtendedProfileSaving = false;
          this.location.isExtendedProfileSaving = false;
          this.contact.isExtendedProfileSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();

          this.additional.isExtendedProfileSaving = false;
          this.location.isExtendedProfileSaving = false;
          this.contact.isExtendedProfileSaving = false;
        }
      })
  }

}
