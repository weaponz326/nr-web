import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { SelectStaffComponent } from '../../../../components/select-windows/staff-windows/select-staff/select-staff.component';
import { SelectShiftComponent } from '../../../../components/select-windows/roster-windows/select-shift/select-shift.component';

import { Personnel } from 'projects/restaurant/src/app/models/modules/roster/roster.model';


@Component({
  selector: 'app-edit-personnel',
  templateUrl: './edit-personnel.component.html',
  styleUrls: ['./edit-personnel.component.scss']
})
export class EditPersonnelComponent implements OnInit {

  @Output() savePersonnelEvent = new EventEmitter<any>();
  @Output() deletePersonnelEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismssButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('selectStaffComponentReference', { read: SelectStaffComponent, static: false }) selectStaff!: SelectStaffComponent;
  @ViewChild('selectShiftComponentReference', { read: SelectShiftComponent, static: false }) selectShift!: SelectShiftComponent;

  personnelData: any

  selectedStaffId: any;
  selectedShftId: any;

  isSaving = false;

  personnelForm = new FormGroup({
    personnelCode: new FormControl({value: "", disabled: true}),
    personnelName: new FormControl({value: "", disabled: true}),
    batchSymbol: new FormControl({value: "", disabled: true}),
  })

  ngOnInit(): void {
  }

  openModal(data: any){
    this.personnelData = data;

    this.personnelForm.controls.personnelCode.setValue(data.personnel_code);
    this.personnelForm.controls.personnelName.setValue(data.personnel_name);

    this.editButton.nativeElement.click();
  }

  savePersonnel(){
    let data = {
      batch_symbol: this.personnelForm.controls.batchSymbol.value,
      staff: this.selectedStaffId,
    }

    let personnel = {
      id: this.personnelData.id,
      data: data
    }

    this.savePersonnelEvent.emit(personnel);
  }

  onStaffSelected(staffData: any){
    console.log(staffData);

    this.selectedStaffId = staffData.id;
    this.personnelForm.controls.personnelCode.setValue(staffData.staff_code);
    this.personnelForm.controls.personnelName.setValue(staffData.first_name + " " + staffData.first_name);
    this.personnelForm.controls.batchSymbol.setValue(staffData.batch_symbol);
  }

  openStaffWindow(){
    console.log("You are opening select staff window")
    this.selectStaff.openModal();
  }

}
