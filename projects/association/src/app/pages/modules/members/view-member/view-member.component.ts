import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MemberFormComponent } from '../member-form/member-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { environment } from 'projects/school/src/environments/environment';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Component({
  selector: 'app-view-member',
  templateUrl: './view-member.component.html',
  styleUrls: ['./view-member.component.scss']
})
export class ViewMemberComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
  ) { }

  @ViewChild('memberFormComponentReference', { read: MemberFormComponent, static: false }) memberForm!: MemberFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Members", url: "/home/members/all-members" },
    { text: "View Member", url: "/home/members/view-member" },
  ];

  memberData: any;

  isMemberLoading = false;
  isMemberSaving = false;
  isMemberDeleting = false;

  ngOnInit(): void {
    this.getMember();
  }

  getMember(){
    this.isMemberLoading = true;

    // this.membersApi.getMember()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.memberData = res;
    //       this.isMemberLoading = false;

    //       this.memberForm.memberForm.controls.memberCode.setValue(this.memberData.member_code);
    //       this.memberForm.memberForm.controls.firstName.setValue(this.memberData.first_name);
    //       this.memberForm.memberForm.controls.lastName.setValue(this.memberData.last_name);
    //       this.memberForm.memberForm.controls.sex.setValue(this.memberData.sex);
    //       this.memberForm.memberForm.controls.memberCode.setValue(this.memberData.member_code);
    //       this.memberForm.memberForm.controls.dateJoined.setValue(this.memberData.date_joined);
    //       this.memberForm.memberForm.controls.phone.setValue(this.memberData.phone);
    //       this.memberForm.memberForm.controls.email.setValue(this.memberData.email);
    //       this.memberForm.memberForm.controls.address.setValue(this.memberData.address);
    //       this.memberForm.memberForm.controls.state.setValue(this.memberData.state);
    //       this.memberForm.memberForm.controls.city.setValue(this.memberData.city);
    //       this.memberForm.memberForm.controls.postCode.setValue(this.memberData.post_code);

    //       if (this.memberData.photo != null)
    //         this.memberForm.photo.imgSrc = environment.apiUrl.slice(0, -1) + this.memberData.photo;
    //       else
    //         this.memberForm.photo.imgSrc = 'assets/images/utilities/photo-avatar.jpg';
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isMemberLoading = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  putMember(){
    console.log('u are saving a new member');

    var data = {
      account: this.customCookie.getCookie('association_id') as string,
      first_name: this.memberForm.memberForm.controls.firstName.value,
      last_name: this.memberForm.memberForm.controls.lastName.value,
      sex: this.memberForm.memberForm.controls.sex.value,
      date_of_birth: this.memberForm.bday.getValue(),
      member_code: this.memberForm.memberForm.controls.memberCode.value,
      date_joined: this.memberForm.memberForm.controls.dateJoined.value,
      phone: this.memberForm.memberForm.controls.phone.value,
      email: this.memberForm.memberForm.controls.email.value,
      address: this.memberForm.memberForm.controls.address.value,
      state: this.memberForm.memberForm.controls.state.value,
      city: this.memberForm.memberForm.controls.city.value,
      post_code: this.memberForm.memberForm.controls.postCode.value,
    }

    console.log(data);
    this.isMemberSaving = true;

    
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteMember(){
    this.isMemberDeleting = true;

    
    
  }

  putMemberImage(){
    // this.membersApi.putMemberPhoto(this.memberForm.photo.image)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.isMemberSaving = false;
    //     },
    //     error: (err) => {
    //       console.log(err);          
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.membersPrint.printViewMember();
  }

}
