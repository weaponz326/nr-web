import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ParentFormComponent } from '../parent-form/parent-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { ParentsApiService } from 'projects/school/src/app/services/modules-api/parents-api/parents-api.service';

// import { Parent } from 'projects/school/src/app/models/modules/parents/parents.model';


@Component({
  selector: 'app-new-parent',
  templateUrl: './new-parent.component.html',
  styleUrls: ['./new-parent.component.scss']
})
export class NewParentComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private parentsApi: ParentsApiService
  ) { }

  @ViewChild('parentFormComponentReference', { read: ParentFormComponent, static: false }) parentForm!: ParentFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Parent", url: "/home/parents/new-parent" },
  ];

  isParentSaving = false;

  ngOnInit(): void {
    this.getNewParentCodeConfig();
  }

  postParent(){
    console.log('u are saving a new parent');

    // var data: Parent = {
    var data = {
      account: this.customCookie.getCookie('school_id') as string,
      parent_code: this.parentForm.parentForm.controls.parentCode.value,
      first_name: this.parentForm.parentForm.controls.firstName.value,
      last_name: this.parentForm.parentForm.controls.lastName.value,
      sex: this.parentForm.parentForm.controls.sex.value,
      nationality: this.parentForm.parentForm.controls.nationality.value,
      religion: this.parentForm.parentForm.controls.religion.value,
      occupation: this.parentForm.parentForm.controls.occupation.value,
      phone: this.parentForm.parentForm.controls.phone.value,
      email: this.parentForm.parentForm.controls.email.value,
      address: this.parentForm.parentForm.controls.address.value,
      state: this.parentForm.parentForm.controls.state.value,
      city: this.parentForm.parentForm.controls.city.value,
      country: this.parentForm.parentForm.controls.city.value,
      post_code: this.parentForm.parentForm.controls.postCode.value,
      // terms: [this.parentForm.selectedTermId],
    }

    console.log(data);
    this.isParentSaving = true;

    this.parentsApi.postParent(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          sessionStorage.setItem('school_parent_id', res.id);

          if(this.parentForm.photo.isImageChanged){
            this.putParentImage();
          }
          else{
            this.router.navigateByUrl('/home/parents/view-parent');                    
          }
        },
        error: (err) => {
          console.log(err);
          this.isParentSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  putParentImage(){
    this.parentsApi.putParentPhoto(this.parentForm.photo.image)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/parent/view-parent');                    
        },
        error: (err) => {
          console.log(err);          
          this.connectionToast.openToast();
        }
      })
  }

  getNewParentCodeConfig(){
    // this.parentForm.parentForm.controls.parentCode.disable();

    this.parentsApi.getNewParentCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.parentForm.parentForm.controls.parentCode.disable();

          if(res.code)
            this.parentForm.parentForm.controls.parentCode.setValue(res.code);
          else
            this.parentForm.parentForm.controls.parentCode.enable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
