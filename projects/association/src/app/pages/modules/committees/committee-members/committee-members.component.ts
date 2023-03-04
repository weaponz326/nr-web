import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component'

import { SelectMemberComponent } from '../../../../components/select-windows/members-windows/select-member/select-member.component';

import { CommitteesApiService } from 'projects/association/src/app/services/modules-api/committees-api/committees-api.service';
import { CommitteeMember } from 'projects/association/src/app/models/modules/committees/committees.model';


@Component({
  selector: 'app-committee-members',
  templateUrl: './committee-members.component.html',
  styleUrls: ['./committee-members.component.scss']
})
export class CommitteeMembersComponent implements OnInit {

  constructor(
    private router: Router,
    private committeesApi: CommitteesApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;
  @ViewChild('selectMemberComponentReference', { read: SelectMemberComponent, static: false }) selectMember!: SelectMemberComponent;

  committeeMembersGridData: any[] = [];

  deleteId = "";

  isFetchingGridData = false;
  isMemberDeleting = false;

  ngOnInit(): void {
    this.getCommitteeCommitteeMember();
  }

  getCommitteeCommitteeMember(){
    this.isFetchingGridData = true;

    this.committeesApi.getCommitteeCommitteeMember()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isFetchingGridData = false;
          this.committeeMembersGridData = res;
        },
        error: (err) => {
          console.log(err);
          this.isFetchingGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  postCommitteeMember(memberData: any){
    let data: CommitteeMember = {
      committee: sessionStorage.getItem('association_committee_id') as string,
      member: memberData.id,
    }

    this.committeesApi.postCommitteeMember(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            this.getCommitteeCommitteeMember();
          }
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  deleteCommitteeMember(){
    this.isMemberDeleting = true;

    this.committeesApi.deleteCommitteeMember(this.deleteId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isMemberDeleting = false;
          this.getCommitteeCommitteeMember();
        },
        error: (err) => {
          console.log(err);
          this.isMemberDeleting = false;
          this.connectionToast.openToast();
        }
      })
  }

  gotoMember(id: any){
    sessionStorage.setItem('association_member_id', id);
    this.router.navigateByUrl('/home/members/view-member');
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

}
