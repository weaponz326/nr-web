import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { SelectStaffComponent } from '../../../../components/select-windows/staff-windows/select-staff/select-staff.component';

import { RosterApiService } from 'projects/restaurant/src/app/services/modules-api/roster-api/roster-api.service';


@Component({
  selector: 'app-personnel-form',
  templateUrl: './personnel-form.component.html',
  styleUrls: ['./personnel-form.component.scss']
})
export class PersonnelFormComponent implements OnInit {

  constructor(private rosterApi: RosterApiService) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('selectStaffComponentReference', { read: SelectStaffComponent, static: false }) selectStaff!: SelectStaffComponent;

  batchSource: any[] = [];

  selectedStaffId: any;

  personnelForm = new FormGroup({
    personnelCode: new FormControl({value: "", disabled: true}),
    personnelName: new FormControl({value: "", disabled: true}),
    batchSymbol: new FormControl(''),
  })

  ngOnInit(): void {
  }

  getRosterBatch(batch: any){
    this.rosterApi.getRosterBatch()
      .subscribe({
        next: (res) => {
          console.log(res);        
          this.batchSource = res.docs;
          this.personnelForm.controls.batchSymbol.setValue(batch);
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  onStaffSelected(staffData: any){
    console.log(staffData);

    this.selectedStaffId = staffData.id;
    this.personnelForm.controls.personnelCode.setValue(staffData.data().staff_code);
    this.personnelForm.controls.personnelName.setValue(staffData.data().first_name + " " + staffData.data().first_name);
    this.personnelForm.controls.batchSymbol.setValue(staffData.data().batch_symbol);
  }

  openStaffWindow(){
    console.log("You are opening select staff window")
    this.selectStaff.openModal();
  }

}
