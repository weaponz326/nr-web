import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-visitor-form',
  templateUrl: './visitor-form.component.html',
  styleUrls: ['./visitor-form.component.scss']
})
export class VisitorFormComponent implements OnInit {

  constructor() { }

  visitorForm = new FormGroup({
    visitCode: new FormControl(''),
    visitDate: new FormControl(),
    visitorName: new FormControl(''),
    visitorPhone: new FormControl(''),
    arrival: new FormControl(),
    departure: new FormControl(),
    purpose: new FormControl(''),
    tagNumber: new FormControl(''),
  })

  ngOnInit(): void {
  }

}
