import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-committee-form',
  templateUrl: './committee-form.component.html',
  styleUrls: ['./committee-form.component.scss']
})
export class CommitteeFormComponent implements OnInit {

  constructor() { }

  committeeForm = new FormGroup({
    committeeName: new FormControl(''),
    description: new FormControl(''),
    dateCommissioned: new FormControl(),
    dateDecommissioned: new FormControl(),
    committeeChairman: new FormControl(''),
  });
  
  ngOnInit(): void {
  }

}
