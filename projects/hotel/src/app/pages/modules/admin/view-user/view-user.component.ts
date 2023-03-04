import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'
import { AccessFormComponent } from '../access-form/access-form.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AccountApiService } from 'projects/hotel/src/app/services/account-api/account-api.service';
import { AdminApiService } from 'projects/hotel/src/app/services/modules-api/admin-api/admin-api.service';


@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private accountApi: AccountApiService,
    private adminApi: AdminApiService
  ) { }

  @ViewChild('accessFormComponentReference', { read: AccessFormComponent, static: false }) accessFormComponent!: AccessFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Users", url: "/home/admin/all-users" },
    { text: "View User", url: "/home/admin/view-user" },
  ];

  userFormData: any;

  accountData: any;
  isCreator = false;

  isUserLoading: boolean = false;
  isUserSaving: boolean = false;
  isUserDeleting: boolean = false;

  userForm = new FormGroup({
    personalName: new FormControl({ value: '', disabled: true }),
    accessLevel: new FormControl(''),
  })

  ngOnInit(): void {
    this.getAccount();
    this.getAccountUser();
  }

  ngAfterViewInit(): void {
    this.accessFormComponent.getUserAccess();
  }

  getAccount() {
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

          this.userForm.controls.personalName.setValue(res.personal_user.first_name + " " + res.personal_user.last_name);
          this.userForm.controls.accessLevel.setValue(res.access_level);

          this.isCreator = res.is_creator;

          if (res.is_creator)
            this.userForm.controls.accessLevel.disable();

          this.isUserLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isUserLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  updateAdminUser() {
    // sends both user access details

    this.isUserSaving = true;

    let data = {
      account: this.customCookie.getCookie('hotel_id'),
      access_level: this.userForm.controls.accessLevel.value,
      personal_user: sessionStorage.getItem('hotel_account_user_id')
    }

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

    this.accessFormComponent.updateUserAccess();
  }

  changeLevel(event: any) {
    console.log(event.target.value);
    this.accessFormComponent.setLevelAccess(event.target.value);
  }

  confirmDelete() {
    this.deleteModal.openModal();
  }

  deleteAdminUser() {
    this.isUserDeleting = true;

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

}
