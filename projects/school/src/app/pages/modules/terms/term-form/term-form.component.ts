import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-term-form',
  templateUrl: './term-form.component.html',
  styleUrls: ['./term-form.component.scss']
})
export class TermFormComponent implements OnInit {

  constructor() { }

  selectedTermId = "";
  selectedTermData = {};

  termForm = new FormGroup({
    termCode: new FormControl(''),
    termName: new FormControl(''),
    academicYear: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    termStatus: new FormControl(''),
  });

  ngOnInit(): void {
  }

}
