import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-appraisal-form',
  templateUrl: './appraisal-form.component.html',
  styleUrls: ['./appraisal-form.component.scss']
})
export class AppraisalFormComponent implements OnInit {

  constructor() { }

  appraisalForm = new FormGroup({
    appraisalCode: new FormControl(''),
    appraisalName: new FormControl(''),
    emplpoyeeCode: new FormControl(''),
    employeeName: new FormControl(''),
    startDate: new FormControl(),
    endDate: new FormControl(),
    supervisor: new FormControl(''),
  });
  
  ngOnInit(): void {
  }

}
