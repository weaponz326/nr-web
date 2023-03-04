import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { CommitteeFormComponent } from '../committee-form/committee-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { CommitteesApiService } from 'projects/association/src/app/services/modules-api/committees-api/committees-api.service';

import { Committee } from 'projects/association/src/app/models/modules/committees/committees.model';


@Component({
  selector: 'app-new-committee',
  templateUrl: './new-committee.component.html',
  styleUrls: ['./new-committee.component.scss']
})
export class NewCommitteeComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private committeesApi: CommitteesApiService
  ) { }

  @ViewChild('committeeFormComponentReference', { read: CommitteeFormComponent, static: false }) committeeForm!: CommitteeFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Committee", url: "/home/committees/new-committee" },
  ];

  isCommitteeSaving = false;

  ngOnInit(): void {
    this.getNewCommitteeCodeConfig();
  }

  postCommittee(){
    console.log('u are saving a new committee');

    var data: Committee = {
      account: this.customCookie.getCookie('association_id') as string,
      committee_name: this.committeeForm.committeeForm.controls.committeeName.value as string,
      description: this.committeeForm.committeeForm.controls.description.value as string,
      date_commissioned: this.committeeForm.committeeForm.controls.dateCommissioned.value,
      date_decommissioned: this.committeeForm.committeeForm.controls.dateDecommissioned.value,
      committee_chairman: this.committeeForm.selectedMemberId,
    }

    console.log(data);
    this.isCommitteeSaving = true;

    this.committeesApi.postCommittee(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isCommitteeSaving = false;

          sessionStorage.setItem('restaurant_committee_id', res.id);
          this.router.navigateByUrl('/home/committees/view-committee');
        },
        error: (err) => {
          console.log(err);
          this.isCommitteeSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  getNewCommitteeCodeConfig(){

    
  }

}
