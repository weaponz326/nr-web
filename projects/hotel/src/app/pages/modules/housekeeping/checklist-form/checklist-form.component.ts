import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-checklist-form',
  templateUrl: './checklist-form.component.html',
  styleUrls: ['./checklist-form.component.scss']
})
export class ChecklistFormComponent implements OnInit {

  constructor() { }

  @Output() openMenuItemWindow = new EventEmitter<any>();

  checklistForm = new FormGroup({
    itemNumber: new FormControl(),
    itemDescription: new FormControl(''),
    itemStatus: new FormControl(''),
    remarks: new FormControl(''),
  })

  ngOnInit(): void {
  }  

}
