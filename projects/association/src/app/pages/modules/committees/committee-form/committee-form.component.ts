import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SelectMemberComponent } from 'projects/association/src/app/components/select-windows/members-windows/select-member/select-member.component';


@Component({
  selector: 'app-committee-form',
  templateUrl: './committee-form.component.html',
  styleUrls: ['./committee-form.component.scss']
})
export class CommitteeFormComponent implements OnInit {

  constructor() { }

  @ViewChild('selectMemberComponentReference', { read: SelectMemberComponent, static: false }) selectMember!: SelectMemberComponent;

  selectedMemberId = "";

  committeeForm = new FormGroup({
    committeeName: new FormControl(''),
    description: new FormControl(''),
    dateCommissioned: new FormControl(),
    dateDecommissioned: new FormControl(),
    committeeChairman: new FormControl(''),
  });
  
  ngOnInit(): void {
  }

  openMemberWindow(){
    console.log("You are opening select member window")
    this.selectMember.openModal();
  }

  onMemberSelected(memberData: any){
    console.log(memberData);

    this.selectedMemberId = memberData.id;
    this.committeeForm.controls.committeeChairman.setValue(memberData?.first_name + " " + memberData?.last_name);
  }
  
}
