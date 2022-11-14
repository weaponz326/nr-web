import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component'


@Component({
  selector: 'app-committee-members',
  templateUrl: './committee-members.component.html',
  styleUrls: ['./committee-members.component.scss']
})
export class CommitteeMembersComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;

  committeeMembersGridData: any[] = [];

  deleteId = "";

  isFetchingGridData = false;
  isMemberDeleting = false;

  ngOnInit(): void {
    this.getCommitteeCommitteeMember();
  }

  getCommitteeCommitteeMember(){
    this.isFetchingGridData = true;

    
  }

  postCommitteeMember(memberData: any){
    let data = {
      committee: sessionStorage.getItem('association_committee_id') as string,
      member: memberData.id,
    }

    
  }

  deleteCommitteeMember(){
    this.isMemberDeleting = true;

    
  }

  gotoMember(id: any){
    sessionStorage.setItem('school_member_id', id);
    this.router.navigateByUrl('/home/members/view-member');
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

}
