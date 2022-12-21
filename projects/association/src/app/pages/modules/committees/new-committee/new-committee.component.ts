import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { CommitteeFormComponent } from '../committee-form/committee-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Component({
  selector: 'app-new-committee',
  templateUrl: './new-committee.component.html',
  styleUrls: ['./new-committee.component.scss']
})
export class NewCommitteeComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
  ) { }

  @ViewChild('committeeFormComponentReference', { read: CommitteeFormComponent, static: false }) committeeForm!: CommitteeFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Committee", url: "/home/committees/new-committee" },
  ];

  storageBasePath = "/school/" + this.customCookie.getCookie('restaurant_id') + "/module_committees/";

  isCommitteeSaving = false;

  ngOnInit(): void {
    this.getNewCommitteeCodeConfig();
  }

  postCommittee(){
    console.log('u are saving a new committee');

    var data = {
      account: this.customCookie.getCookie('association_id') as string,
      first_name: this.committeeForm.committeeForm.controls.committeeName.value as string,
      last_name: this.committeeForm.committeeForm.controls.description.value as string,
      sex: this.committeeForm.committeeForm.controls.dateCommissioned.value as string,
      committee_code: this.committeeForm.committeeForm.controls.dateDecommissioned.value as string,
    }

    console.log(data);
    this.isCommitteeSaving = true;

        
  }

  putCommitteeImage(){
    // this.committeesApi.putCommitteePhoto(this.committeeForm.photo.image)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.router.navigateByUrl('/home/committees/view-committee');                    
    //     },
    //     error: (err) => {
    //       console.log(err);          
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  getNewCommitteeCodeConfig(){

    
  }

}
