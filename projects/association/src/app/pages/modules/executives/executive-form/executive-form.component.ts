import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-executive-form',
  templateUrl: './executive-form.component.html',
  styleUrls: ['./executive-form.component.scss']
})
export class ExecutiveFormComponent implements OnInit {

  constructor() { }

  executiveForm = new FormGroup({
    name: new FormControl(''),
    position: new FormControl(''),
    fiscalYear: new FormControl(''),
  });
  
  ngOnInit(): void {
  }

}
