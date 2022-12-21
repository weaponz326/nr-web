import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component'


@Component({
  selector: 'app-group-members',
  templateUrl: './group-members.component.html',
  styleUrls: ['./group-members.component.scss']
})
export class GroupMembersComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;

  classMembersGridData: any[] = [];

  deleteId = "";

  isFetchingGridData = false;
  isMemberDeleting = false;

  ngOnInit(): void {
    this.getGroupGroupMember();
  }

  getGroupGroupMember(){
    this.isFetchingGridData = true;


  }

  postGroupMember(memberData: any){
    let data = {
      group: sessionStorage.getItem('association_group_id') as string,
      member: memberData.id,
    }

    
  }

  deleteGroupMember(){
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
