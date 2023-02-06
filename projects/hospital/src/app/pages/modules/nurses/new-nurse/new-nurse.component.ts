import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NurseFormComponent } from '../nurse-form/nurse-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { NursesApiService } from 'projects/hospital/src/app/services/modules-api/nurses-api/nurses-api.service';

// import { Nurse } from 'projects/hospital/src/app/models/modules/nurses/nurses.model';


@Component({
  selector: 'app-new-nurse',
  templateUrl: './new-nurse.component.html',
  styleUrls: ['./new-nurse.component.scss']
})
export class NewNurseComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    // private nursesApi: NursesApiService,
  ) { }

  @ViewChild('nurseFormComponentReference', { read: NurseFormComponent, static: false }) nurseForm!: NurseFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Nurse", url: "/home/nurses/new-nurse" },
  ];

  storageBasePath = "/hospital/" + this.customCookie.getCookie('hospital_id') + "/module_nurses/";

  isNurseSaving = false;

  ngOnInit(): void {
    this.getNewNurseCodeConfig();
  }

  postNurse(){
    console.log('u are saving a new nurse');

    var data = {
      account: this.customCookie.getCookie('hospital_id') as string,
      first_name: this.nurseForm.nurseForm.controls.firstName.value as string,
      last_name: this.nurseForm.nurseForm.controls.lastName.value as string,
      sex: this.nurseForm.nurseForm.controls.sex.value as string,
      date_of_birth: this.nurseForm.bday.getValue(),
      nurse_code: this.nurseForm.nurseForm.controls.nurseCode.value as string,
      department: this.nurseForm.nurseForm.controls.department.value as string,
      nationality: this.nurseForm.nurseForm.controls.nationality.value as string,
      religion: this.nurseForm.nurseForm.controls.religion.value as string,
      phone: this.nurseForm.nurseForm.controls.phone.value as string,
      email: this.nurseForm.nurseForm.controls.email.value as string,
      address: this.nurseForm.nurseForm.controls.address.value as string,
      state: this.nurseForm.nurseForm.controls.state.value as string,
      city: this.nurseForm.nurseForm.controls.city.value as string,
      post_code: this.nurseForm.nurseForm.controls.postCode.value as string,
    }

    console.log(data);
    this.isNurseSaving = true;

    // this.nursesApi.postNurse(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       sessionStorage.setItem('hospital_nurse_id', res.id);

    //       if(this.nurseForm.photo.isImageChanged){
    //         this.putNurseImage();
    //       }
    //       else{
    //         this.router.navigateByUrl('/home/nurses/view-nurse');                    
    //       }
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isNurseSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  putNurseImage(){
    // this.nursesApi.putNursePhoto(this.nurseForm.photo.image)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.router.navigateByUrl('/home/nurses/view-nurse');                    
    //     },
    //     error: (err) => {
    //       console.log(err);          
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  getNewNurseCodeConfig(){
    // this.nursesApi.getNewNurseCodeConfig()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       this.nurseForm.nurseForm.controls.clinicalNumber.disable();

    //       if(res.code)
    //         this.nurseForm.nurseForm.controls.clinicalNumber.setValue(res.code);
    //       else
    //         this.nurseForm.nurseForm.controls.clinicalNumber.enable();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

}
