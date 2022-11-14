import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MemberFormComponent } from '../member-form/member-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Component({
  selector: 'app-new-member',
  templateUrl: './new-member.component.html',
  styleUrls: ['./new-member.component.scss']
})
export class NewMemberComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
  ) { }

  @ViewChild('memberFormComponentReference', { read: MemberFormComponent, static: false }) memberForm!: MemberFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Member", url: "/home/members/new-member" },
  ];

  storageBasePath = "/school/" + this.customCookie.getCookie('restaurant_id') + "/module_members/";

  isMemberSaving = false;

  ngOnInit(): void {
    this.getNewMemberCodeConfig();
  }

  postMember(){
    console.log('u are saving a new member');

    var data = {
      account: this.customCookie.getCookie('school_id') as string,
      first_name: this.memberForm.memberForm.controls.firstName.value as string,
      last_name: this.memberForm.memberForm.controls.lastName.value as string,
      sex: this.memberForm.memberForm.controls.sex.value as string,
      date_of_birth: this.memberForm.bday.getValue(),
      member_code: this.memberForm.memberForm.controls.memberCode.value as string,
      date_joined: this.memberForm.memberForm.controls.dateJoined.value,
      phone: this.memberForm.memberForm.controls.phone.value as string,
      email: this.memberForm.memberForm.controls.email.value as string,
      address: this.memberForm.memberForm.controls.address.value as string,
      state: this.memberForm.memberForm.controls.state.value as string,
      city: this.memberForm.memberForm.controls.city.value as string,
      post_code: this.memberForm.memberForm.controls.postCode.value as string,
    }

    console.log(data);
    this.isMemberSaving = true;

        
  }

  putMemberImage(){
    // this.membersApi.putMemberPhoto(this.memberForm.photo.image)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.router.navigateByUrl('/home/members/view-member');                    
    //     },
    //     error: (err) => {
    //       console.log(err);          
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  getNewMemberCodeConfig(){

    
  }

}
