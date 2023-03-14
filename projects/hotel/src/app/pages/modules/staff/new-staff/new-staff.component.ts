import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { StaffFormComponent } from '../staff-form/staff-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { StaffApiService } from 'projects/hotel/src/app/services/modules-api/staff-api/staff-api.service';

import { Staff } from 'projects/hotel/src/app/models/modules/staff/staff.model';


@Component({
  selector: 'app-new-staff',
  templateUrl: './new-staff.component.html',
  styleUrls: ['./new-staff.component.scss']
})
export class NewStaffComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private staffApi: StaffApiService
  ) { }

  @ViewChild('staffFormComponentReference', { read: StaffFormComponent, static: false }) staffForm!: StaffFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Staff", url: "/home/staff/new-staff" },
  ];

  isStaffSaving = false;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getNewStaffCodeConfig();
  }

  createStaff(){
    console.log('u are saving a new staff');

    var data = {
      account: this.customCookie.getCookie('hotel_id') as string,
      first_name: this.staffForm.staffForm.controls.firstName.value as string,
      last_name: this.staffForm.staffForm.controls.lastName.value as string,
      sex: this.staffForm.staffForm.controls.sex.value as string,
      date_of_birth: this.staffForm.bday.getValue(),
      nationality: this.staffForm.staffForm.controls.nationality.value as string,
      religion: this.staffForm.staffForm.controls.religion.value as string,
      phone: this.staffForm.staffForm.controls.phone.value as string,
      email: this.staffForm.staffForm.controls.email.value as string,
      address: this.staffForm.staffForm.controls.address.value as string,
      state: this.staffForm.staffForm.controls.state.value as string,
      city: this.staffForm.staffForm.controls.city.value as string,
      post_code: this.staffForm.staffForm.controls.postCode.value as string,
      staff_code: this.staffForm.staffForm.controls.staffCode.value as string,
      department: this.staffForm.staffForm.controls.department.value as string,
      job: this.staffForm.staffForm.controls.job.value as string,
    }

    console.log(data);
    this.isStaffSaving = true;

    this.staffApi.postStaff(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          sessionStorage.setItem('hotel_staff_id', res.id);

          if(this.staffForm.photo.isImageChanged){
            this.putStaffImage();
          }
          else{
            this.router.navigateByUrl('/home/staff/view-staff');                    
          }
        },
        error: (err) => {
          console.log(err);
          this.isStaffSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  putStaffImage(){
    this.staffApi.putStaffPhoto(this.staffForm.photo.image)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/staff/view-staff');                    
        },
        error: (err) => {
          console.log(err);          
          this.connectionToast.openToast();
        }
      })
  }

  getNewStaffCodeConfig(){
    this.staffApi.getNewStaffCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.code){
            this.staffForm.staffForm.controls.staffCode.disable();
            this.staffForm.staffForm.controls.staffCode.setValue(res.code);
          }
          else{
            this.staffForm.staffForm.controls.staffCode.enable();
          }
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
