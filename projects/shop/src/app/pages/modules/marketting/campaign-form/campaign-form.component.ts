import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.scss']
})
export class CampaignFormComponent implements OnInit {

  constructor() { }

  campaignForm = new FormGroup({
    campaignCode: new FormControl(''),
    campaignName: new FormControl(''),
    campaignType: new FormControl(''),
    targetAudience: new FormControl(''),
    campaignStatus: new FormControl(''),
    supervisor: new FormControl(''),
    goals: new FormControl(''),
    startDate: new FormControl(),
    endDate: new FormControl(),
  })

  ngOnInit(): void {
  }

}
