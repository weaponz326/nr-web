import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ParentFormComponent } from '../parent-form/parent-form.component';
import { ParentWardsComponent } from '../parent-wards/parent-wards.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

// import { ParentsApiService } from 'projects/school/src/app/services/modules/parents-api/parents-api.service';
// import { ParentsPrintService } from 'projects/school/src/app/services/printing/parents-print/parents-print.service';

// import { Parent } from 'projects/school/src/app/models/modules/parents/parents.model';


@Component({
  selector: 'app-view-parent',
  templateUrl: './view-parent.component.html',
  styleUrls: ['./view-parent.component.scss']
})
export class ViewParentComponent implements OnInit {

  constructor(
    private router: Router,
    // private parentsApi: ParentsApiService,
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

    // this.parentsApi.getParent()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.parentData = res;
    //       this.isParentLoading = false;

    //       this.parentForm.parentForm.controls.parentCode.setValue(this.parentData.data().parent_code);
    //       this.parentForm.parentForm.controls.firstName.setValue(this.parentData.data().first_name);
    //       this.parentForm.parentForm.controls.lastName.setValue(this.parentData.data().last_name);
    //       this.parentForm.parentForm.controls.sex.setValue(this.parentData.data().sex);
    //       this.parentForm.parentForm.controls.photo.setValue(this.parentData.data().photo);
    //       this.parentForm.parentForm.controls.nationality.setValue(this.parentData.data().nationality);
    //       this.parentForm.parentForm.controls.religion.setValue(this.parentData.data().religion);
    //       this.parentForm.parentForm.controls.occupation.setValue(this.parentData.data().occupation);
    //       this.parentForm.parentForm.controls.phone.setValue(this.parentData.data().phone);
    //       this.parentForm.parentForm.controls.email.setValue(this.parentData.data().email);
    //       this.parentForm.parentForm.controls.address.setValue(this.parentData.data().address);
    //       this.parentForm.parentForm.controls.state.setValue(this.parentData.data().state);
    //       this.parentForm.parentForm.controls.city.setValue(this.parentData.data().city);
    //       this.parentForm.parentForm.controls.country.setValue(this.parentData.data().country);
    //       this.parentForm.parentForm.controls.postCode.setValue(this.parentData.data().post_code);

    //       if (this.parentData.data().photo != ""){
    //         this.parentForm.photo.imgSrc = this.parentData.data().photo;
    //         this.parentForm.photo.isImageSet = true;
    //       }
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isParentLoading = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  updateParent(){
    console.log('u are saving a new parent');

    var data = {
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

    // this.parentsApi.updateParent(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);

    //       this.updateTerm();
    //       this.updateImage();
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isParentSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  updateTerm(){
    console.log('u are adding new term to term');

    if (this.parentData.data().terms.include({id: this.parentForm.selectedTermId})){
      console.log('lets go ahead with term update');

      let data = {
        terms: {
          id: this.parentForm.selectedTermId,
          data: this.parentForm.selectedTermData,
        }
      }

      // this.parentsApi.updateParent(data)
      //   .then(
      //     (res: any) => {
      //       console.log(res);
      //       this.isParentSaving = false;
      //     },
      //     (err: any) => {
      //       console.log(err);
      //       this.isParentSaving = false;
      //       this.connectionToast.openToast();
      //     }
      //   )
    }
    else{
      console.log('no need to update term');
      this.isParentSaving = false;
    }
  }

  deleteParent(){
    this.isParentDeleting = true;

    // this.parentsApi.deleteParent()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.router.navigateByUrl('/home/parents/all-parents');
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  onPrint(){
    console.log("lets start printing...");
    // this.parentsPrint.printViewParent();
  }

}
