import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { CommitteeFormComponent } from '../committee-form/committee-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { CommitteesApiService } from 'projects/association/src/app/services/modules-api/committees-api/committees-api.service';
// import { CommitteesPrintService } from 'projects/association/src/app/services/modules-printing/committees-print/committees-print.service';

import { Committee } from 'projects/association/src/app/models/modules/committees/committees.model';


@Component({
  selector: 'app-view-committee',
  templateUrl: './view-committee.component.html',
  styleUrls: ['./view-committee.component.scss']
})
export class ViewCommitteeComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private committeesApi: CommitteesApiService,
    // private committeesPrint: CommitteesPrintService,
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

    this.committeesApi.getCommittee()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.committeeData = res;
          this.isCommitteeLoading = false;

          this.committeeForm.committeeForm.controls.committeeName.setValue(this.committeeData.committee_name);
          this.committeeForm.committeeForm.controls.description.setValue(this.committeeData.description);
          this.committeeForm.committeeForm.controls.dateCommissioned.setValue(this.committeeData.date_commissioned);
          this.committeeForm.committeeForm.controls.dateDecommissioned.setValue(this.committeeData.date_decommissioned);
          this.committeeForm.committeeForm.controls.committeeChairman.setValue(this.committeeData.committee_chairman?.first_name + " " + this.committeeData.committee_chairman?.last_name);

          this.committeeForm.selectedMemberId = this.committeeData.committee_chairman.id
        },
        error: (err) => {
          console.log(err);
          this.isCommitteeLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putCommittee(){
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

    this.committeesApi.putCommittee(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isCommitteeSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isCommitteeSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteCommittee(){
    this.isCommitteeDeleting = true;

    this.committeesApi.deleteCommittee()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/committees/all-committees');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })    
  }

  onPrint(){
    console.log("lets start printing...");
    // this.committeesPrint.printViewCommittee();
  }

}
