import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DoctorFormComponent } from '../doctor-form/doctor-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { DoctorsApiService } from 'projects/hospital/src/app/services/modules-api/doctors-api/doctors-api.service';

// import { Doctor } from 'projects/hospital/src/app/models/modules/doctors/doctors.model';


@Component({
  selector: 'app-new-doctor',
  templateUrl: './new-doctor.component.html',
  styleUrls: ['./new-doctor.component.scss']
})
export class NewDoctorComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    // private doctorsApi: DoctorsApiService,
  ) { }

  @ViewChild('doctorFormComponentReference', { read: DoctorFormComponent, static: false }) doctorForm!: DoctorFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Doctor", url: "/home/doctors/new-doctor" },
  ];

  storageBasePath = "/hospital/" + this.customCookie.getCookie('hospital_id') + "/module_doctors/";

  isDoctorSaving = false;

  ngOnInit(): void {
    this.getNewDoctorCodeConfig();
  }

  postDoctor(){
    console.log('u are saving a new doctor');

    var data = {
      account: this.customCookie.getCookie('hospital_id') as string,
      first_name: this.doctorForm.doctorForm.controls.firstName.value as string,
      last_name: this.doctorForm.doctorForm.controls.lastName.value as string,
      sex: this.doctorForm.doctorForm.controls.sex.value as string,
      date_of_birth: this.doctorForm.bday.getValue(),
      doctor_code: this.doctorForm.doctorForm.controls.doctorCode.value as string,
      department: this.doctorForm.doctorForm.controls.department.value as string,
      speciality: this.doctorForm.doctorForm.controls.speciality.value as string,
      nationality: this.doctorForm.doctorForm.controls.nationality.value as string,
      religion: this.doctorForm.doctorForm.controls.religion.value as string,
      phone: this.doctorForm.doctorForm.controls.phone.value as string,
      email: this.doctorForm.doctorForm.controls.email.value as string,
      address: this.doctorForm.doctorForm.controls.address.value as string,
      state: this.doctorForm.doctorForm.controls.state.value as string,
      city: this.doctorForm.doctorForm.controls.city.value as string,
      post_code: this.doctorForm.doctorForm.controls.postCode.value as string,
    }

    console.log(data);
    this.isDoctorSaving = true;

    // this.doctorsApi.postDoctor(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       sessionStorage.setItem('hospital_doctor_id', res.id);

    //       if(this.doctorForm.photo.isImageChanged){
    //         this.putDoctorImage();
    //       }
    //       else{
    //         this.router.navigateByUrl('/home/doctors/view-doctor');                    
    //       }
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isDoctorSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  putDoctorImage(){
    // this.doctorsApi.putDoctorPhoto(this.doctorForm.photo.image)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.router.navigateByUrl('/home/doctors/view-doctor');                    
    //     },
    //     error: (err) => {
    //       console.log(err);          
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  getNewDoctorCodeConfig(){
    // this.doctorsApi.getNewDoctorCodeConfig()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       this.doctorForm.doctorForm.controls.clinicalNumber.disable();

    //       if(res.code)
    //         this.doctorForm.doctorForm.controls.clinicalNumber.setValue(res.code);
    //       else
    //         this.doctorForm.doctorForm.controls.clinicalNumber.enable();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

}
