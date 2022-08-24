import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {

  constructor() { }

  @Output() updateUserEvent = new EventEmitter<any>;

  isUserLoading = false;
  isUserSaving = false;

  basicForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    about: new FormControl('')
  })

  ngOnInit(): void {
  }

  updateBasic(){
    let data = {
      first_name: this.basicForm.controls.firstName.value,
      last_name: this.basicForm.controls.lastName.value,
      about: this.basicForm.controls.about.value,
    }

    this.updateUserEvent.emit(data);
  }

}
