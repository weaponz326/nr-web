import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component'
import { SelectMemberComponent } from '../../../../components/select-windows/members-windows/select-member/select-member.component';

import { GroupsApiService } from 'projects/association/src/app/services/modules-api/groups-api/groups-api.service';
import { GroupMember } from 'projects/association/src/app/models/modules/groups/groups.model';


@Component({
  selector: 'app-group-members',
  templateUrl: './group-members.component.html',
  styleUrls: ['./group-members.component.scss']
})
export class GroupMembersComponent implements OnInit {

  constructor(
    private router: Router,
    private groupsApi: GroupsApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;
  @ViewChild('selectMemberComponentReference', { read: SelectMemberComponent, static: false }) selectMember!: SelectMemberComponent;

  membersGridData: any[] = [];

  deleteId = "";

  isFetchingGridData = false;
  isMemberDeleting = false;

  ngOnInit(): void {
    this.getGroupGroupMember();
  }

  getGroupGroupMember(){
    this.isFetchingGridData = true;

    this.groupsApi.getGroupGroupMember()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isFetchingGridData = false;
          this.membersGridData = res;
        },
        error: (err) => {
          console.log(err);
          this.isFetchingGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  postGroupMember(memberData: any){
    let data: GroupMember = {
      group: sessionStorage.getItem('association_group_id') as string,
      member: memberData.id,
    }

    this.groupsApi.postGroupMember(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            this.getGroupGroupMember();
          }
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  deleteGroupMember(){
    this.isMemberDeleting = true;

    this.groupsApi.deleteGroupMember(this.deleteId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isMemberDeleting = false;
          this.getGroupGroupMember();
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
