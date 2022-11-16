import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {

  constructor() { }

  groupForm = new FormGroup({
    groupCode: new FormControl(''),
    groupName: new FormControl(''),
  })

  ngOnInit(): void {
  }

}
