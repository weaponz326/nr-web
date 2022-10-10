import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-plan-sheet',
  templateUrl: './plan-sheet.component.html',
  styleUrls: ['./plan-sheet.component.scss']
})
export class PlanSheetComponent implements OnInit {

  constructor() { }

  sheetForm = new FormGroup({
    objectives: new FormControl(''),
    materials: new FormControl(''),
    introduction: new FormControl(''),
    mainActivity: new FormControl(''),
    closure: new FormControl(''),
    assessment: new FormControl(''),
  })
  
  ngOnInit(): void {
  }

}
