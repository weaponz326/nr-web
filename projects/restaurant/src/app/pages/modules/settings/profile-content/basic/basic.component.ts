import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {

  constructor() { }

  @Output() updateAccountEvent = new EventEmitter<any>;

  isAccountLoading = false;
  isAccountSaving = false;

  basicForm = new FormGroup({
    name: new FormControl(''),
    about: new FormControl('')
  })

  ngOnInit(): void {
  }

  updateBasic(){
    let data = {
      name: this.basicForm.controls.name.value,
      about: this.basicForm.controls.about.value,
    }

    this.updateAccountEvent.emit(data);
  }

}
