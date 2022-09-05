import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.scss']
})
export class TableFormComponent implements OnInit {

  constructor() { }

  tableForm = new FormGroup({
    tableNumber: new FormControl(''),
    tableType: new FormControl(''),
    capacity: new FormControl(),
    location: new FormControl(''),
    tableStatus: new FormControl(''),
  })

  ngOnInit(): void {
  }

}
