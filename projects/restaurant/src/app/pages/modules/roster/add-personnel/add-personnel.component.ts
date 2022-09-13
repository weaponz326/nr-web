import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { SelectStaffComponent } from '../../../../components/select-windows/staff-windows/select-staff/select-staff.component';
import { SelectShiftComponent } from '../../../../components/select-windows/roster-windows/select-shift/select-shift.component';

import { Personnel } from 'projects/restaurant/src/app/models/modules/roster/roster.model';


@Component({
  selector: 'app-add-personnel',
  templateUrl: './add-personnel.component.html',
  styleUrls: ['./add-personnel.component.scss']
})
export class AddPersonnelComponent implements OnInit {

  constructor() { }

  @Output() savePersonnelEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismssButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('selectStaffComponentReference', { read: SelectStaffComponent, static: false }) selectStaff!: SelectStaffComponent;
  @ViewChild('selectShiftComponentReference', { read: SelectShiftComponent, static: false }) selectShift!: SelectShiftComponent;

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

  openModal(){
    this.addButton.nativeElement.click();
  }

  savePersonnel(){
    let data: Personnel = {
      roster: sessionStorage.getItem('restaurant_roster_id') as string,      
      batch_symbol: this.personnelForm.controls.batchSymbol.value as string,
      staff: this.selectedStaffId
    }
    this.savePersonnelEvent.emit(data);
  }

  resetForm(){
    this.personnelForm.controls.personnelCode.setValue('');
    this.personnelForm.controls.personnelName.setValue('');
    this.personnelForm.controls.batchSymbol.setValue('');
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
