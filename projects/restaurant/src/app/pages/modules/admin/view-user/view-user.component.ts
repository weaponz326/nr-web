import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'
import { AccessFormComponent } from '../access-form/access-form.component';

import { AccountApiService } from 'projects/restaurant/src/app/services/account-api/account-api.service';
import { AdminApiService } from 'projects/restaurant/src/app/services/modules-api/admin-api/admin-api.service';


@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  constructor(
    private router: Router,
    private accountApi: AccountApiService,
    private adminApi: AdminApiService
  ) { }

  @ViewChild('buttonElementReference', { read: ElementRef, static: false }) buttonElement!: ElementRef;

  @ViewChild('accessFormComponentReference', { read: AccessFormComponent, static: false }) accessFormComponent!: AccessFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Users", url: "/home/admin/all-users" },
    { text: "View User", url: "/home/admin/view-user" },
  ];

  userFormData: any;

  AccountUserPersonalId: any;
  accountData: any;

  isUserLoading: boolean = false;
  isUserSaving: boolean = false;
  isUserDeleting: boolean = false;

  userForm = new FormGroup({
    personalName: new FormControl(''),
    accessLevel: new FormControl(''),
  })

  ngOnInit(): void {
    this.getAccountUser();
  }

  ngAfterViewInit(): void {
    this.accessFormComponent.getUserAccess();
  }

  getAccount(){
    this.accountApi.getAccount()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.accountData = res;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }


  getAccountUser() {
    this.isUserLoading = true;

    this.adminApi.getAccountUser()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.userFormData = res;

          this.AccountUserPersonalId = res.id;
          this.userForm.controls.personalName.setValue(res.personal_name);
          this.userForm.controls.accessLevel.setValue(res.access_level);

          this.isUserLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isUserLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  updateAdminUser(){
    // sends both user access details

    this.isUserSaving = true;

    let data = {
      access_level: this.userForm.controls.accessLevel.value,
    }

    if (this.accountData.created_by != this.AccountUserPersonalId){
      this.adminApi.putAccountUser(data)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.isUserSaving = false;
          },
          error: (err) => {
            console.log(err);
            this.isUserSaving = false;
            this.connectionToast.openToast();
          }
        })
    }
    else{
      this.buttonElement.nativeElement.click();
    }

    // this.accessFormComponent.updateUserAccess();
  }

  changeLevel(event: any)  {
    console.log(event.target.value);
    this.accessFormComponent.setLevelAccess(event.target.value);
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteAdminUser(){
    this.isUserDeleting = true;

    if (this.accountData.created_by != this.AccountUserPersonalId){
      this.adminApi.deleteAccountUser()
        .subscribe({
          next: (res) => {
            console.log(res);
            this.isUserDeleting = false;

            this.router.navigateByUrl('/home/admin/all-users');
          },
          error: (err) => {
            console.log(err);
            this.isUserDeleting = false;
            this.connectionToast.openToast();
          }
        })
    }
    else{
      this.buttonElement.nativeElement.click();
    }
  }

}
