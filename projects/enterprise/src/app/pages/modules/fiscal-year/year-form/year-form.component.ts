import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-year-form',
  templateUrl: './year-form.component.html',
  styleUrls: ['./year-form.component.scss']
})
export class YearFormComponent implements OnInit {

  constructor() { }

  yearForm = new FormGroup({
    yearCode: new FormControl(''),
    yearName: new FormControl(''),
    startDate: new FormControl(),
    endDate: new FormControl(),
    yearStatus: new FormControl(''),
  });

  ngOnInit(): void {
  }

}
