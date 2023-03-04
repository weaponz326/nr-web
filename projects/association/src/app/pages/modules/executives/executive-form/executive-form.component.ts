import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SelectMemberComponent } from 'projects/association/src/app/components/select-windows/members-windows/select-member/select-member.component';
import { SelectFiscalYearComponent } from 'projects/association/src/app/components/select-windows/fiscal-year-windows/select-fiscal-year/select-fiscal-year.component';


@Component({
  selector: 'app-executive-form',
  templateUrl: './executive-form.component.html',
  styleUrls: ['./executive-form.component.scss']
})
export class ExecutiveFormComponent implements OnInit {

  constructor() { }

  @ViewChild('selectMemberComponentReference', { read: SelectMemberComponent, static: false }) selectMember!: SelectMemberComponent;
  @ViewChild('selectFiscalYearComponentReference', { read: SelectFiscalYearComponent, static: false }) selectYear!: SelectFiscalYearComponent;

  selectedMemberId = "";
  selectedYearId = "";

  executiveForm = new FormGroup({
    name: new FormControl(''),
    position: new FormControl(''),
    fiscalYear: new FormControl(''),
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
    this.executiveForm.controls.name.setValue(memberData?.first_name + " " + memberData?.last_name);
  }

  openYearWindow(){
    console.log("You are opening select fiscal year window")
    this.selectYear.openModal();
  }

  onYearSelected(yearData: any){
    console.log(yearData);

    this.selectedYearId = yearData.id;
    this.executiveForm.controls.fiscalYear.setValue(yearData?.year_name);
  }

}
