import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss']
})
export class ScheduleFormComponent implements OnInit {

  constructor() { }

  scheduleForm = new FormGroup({
    scheduleName: new FormControl(''),
    description: new FormControl(''),
    startDate: new FormControl(),
    endDate: new FormControl(),
    location: new FormControl(''),
    status: new FormControl(''),
  })

  ngOnInit(): void {
  }

}
