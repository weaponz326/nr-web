import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { CommitteeFormComponent } from '../committee-form/committee-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { environment } from 'projects/school/src/environments/environment';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Component({
  selector: 'app-view-committee',
  templateUrl: './view-committee.component.html',
  styleUrls: ['./view-committee.component.scss']
})
export class ViewCommitteeComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
  ) { }

  @ViewChild('committeeFormComponentReference', { read: CommitteeFormComponent, static: false }) committeeForm!: CommitteeFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Committees", url: "/home/committees/all-committees" },
    { text: "View Committee", url: "/home/committees/view-committee" },
  ];

  committeeData: any;

  isCommitteeLoading = false;
  isCommitteeSaving = false;
  isCommitteeDeleting = false;

  ngOnInit(): void {
    this.getCommittee();
  }

  getCommittee(){
    this.isCommitteeLoading = true;

    
  }

  putCommittee(){
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

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteCommittee(){
    this.isCommitteeDeleting = true;

    
    
  }

  onPrint(){
    console.log("lets start printing...");
    // this.committeesPrint.printViewCommittee();
  }

}
