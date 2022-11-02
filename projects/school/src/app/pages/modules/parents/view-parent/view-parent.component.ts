import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ParentFormComponent } from '../parent-form/parent-form.component';
import { ParentWardsComponent } from '../parent-wards/parent-wards.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { environment } from 'projects/school/src/environments/environment';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { ParentsApiService } from 'projects/school/src/app/services/modules-api/parents-api/parents-api.service';
// import { ParentsPrintService } from 'projects/school/src/app/services/printing/parents-print/parents-print.service';

import { Parent } from 'projects/school/src/app/models/modules/parents/parents.model';


@Component({
  selector: 'app-view-parent',
  templateUrl: './view-parent.component.html',
  styleUrls: ['./view-parent.component.scss']
})
export class ViewParentComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private parentsApi: ParentsApiService,
    // private parentsPrint: ParentsPrintService,
  ) { }

  @ViewChild('parentFormComponentReference', { read: ParentFormComponent, static: false }) parentForm!: ParentFormComponent;
  @ViewChild('parentWardsComponentReference', { read: ParentWardsComponent, static: false }) parentWards!: ParentWardsComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Parents", url: "/home/parents/all-parents" },
    { text: "View Parent", url: "/home/parents/view-parent" },
  ];

  parentData: any;

  isParentLoading = false;
  isParentSaving = false;
  isParentDeleting = false;

  ngOnInit(): void {
    this.getParent();
  }

  getParent(){
    this.isParentLoading = true;

    this.parentsApi.getParent()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.parentData = res;
          this.isParentLoading = false;

          this.parentForm.selectedTermId = this.parentData.term?.id;

          this.parentForm.parentForm.controls.term.setValue(this.parentData.term?.term_name);
          this.parentForm.parentForm.controls.parentCode.setValue(this.parentData.parent_code);
          this.parentForm.parentForm.controls.firstName.setValue(this.parentData.first_name);
          this.parentForm.parentForm.controls.lastName.setValue(this.parentData.last_name);
          this.parentForm.parentForm.controls.sex.setValue(this.parentData.sex);
          this.parentForm.parentForm.controls.photo.setValue(this.parentData.photo);
          this.parentForm.parentForm.controls.nationality.setValue(this.parentData.nationality);
          this.parentForm.parentForm.controls.religion.setValue(this.parentData.religion);
          this.parentForm.parentForm.controls.occupation.setValue(this.parentData.occupation);
          this.parentForm.parentForm.controls.phone.setValue(this.parentData.phone);
          this.parentForm.parentForm.controls.email.setValue(this.parentData.email);
          this.parentForm.parentForm.controls.address.setValue(this.parentData.address);
          this.parentForm.parentForm.controls.state.setValue(this.parentData.state);
          this.parentForm.parentForm.controls.city.setValue(this.parentData.city);
          this.parentForm.parentForm.controls.country.setValue(this.parentData.country);
          this.parentForm.parentForm.controls.postCode.setValue(this.parentData.post_code);

          if (this.parentData.photo != null)
            this.parentForm.photo.imgSrc = environment.apiUrl.slice(0, -1) + this.parentData.photo;
          else
            this.parentForm.photo.imgSrc = 'assets/images/utilities/photo-avatar.jpg';
        },
        error: (err) => {
          console.log(err);
          this.isParentLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putParent(){
    console.log('u are saving a new parent');

    var data = {
      account: this.customCookie.getCookie('school_id') as string,
      term: this.parentForm.selectedTermId,
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
      country: this.parentForm.parentForm.controls.country.value,
      post_code: this.parentForm.parentForm.controls.postCode.value,
    }

    console.log(data);
    this.isParentSaving = true;

    this.parentsApi.putParent(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(this.parentForm.photo.isImageChanged){
            this.putParentImage();
          }
          else{
            this.isParentSaving = false;
          }
        },
        error: (err) => {
          console.log(err);
          this.isParentSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteParent(){
    this.isParentDeleting = true;

    this.parentsApi.deleteParent()
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.router.navigateByUrl('/home/parents/all-parents');
        },
        error: (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  putParentImage(){
    this.parentsApi.putParentPhoto(this.parentForm.photo.image)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isParentSaving = false;
        },
        error: (err) => {
          console.log(err);          
          this.connectionToast.openToast();
        }
      })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.parentsPrint.printViewParent();
  }

}
