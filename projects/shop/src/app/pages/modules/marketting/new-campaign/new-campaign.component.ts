import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { CampaignFormComponent } from '../campaign-form/campaign-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { MarkettingApiService } from 'projects/shop/src/app/services/modules-api/marketting-api/marketting-api.service';

import { Campaign } from 'projects/shop/src/app/models/modules/marketting/marketting.model';


@Component({
  selector: 'app-new-campaign',
  templateUrl: './new-campaign.component.html',
  styleUrls: ['./new-campaign.component.scss']
})
export class NewCampaignComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private markettingApi: MarkettingApiService
  ) { }

  @ViewChild('campaignFormComponentReference', { read: CampaignFormComponent, static: false }) campaignForm!: CampaignFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Campaign", url: "/home/marketting/new-campaign" },
  ];

  isCampaignSaving = false;

  ngOnInit(): void {
  }

  postCampaign(){
    console.log('u are saving a new campaign');

    let data: Campaign = {
      account: this.customCookie.getCookie('shop_id') as string,
      campaign_code: this.campaignForm.campaignForm.controls.campaignCode.value as string,
      campaign_name: this.campaignForm.campaignForm.controls.campaignName.value as string,
      campaign_type: this.campaignForm.campaignForm.controls.campaignType.value as string,
      target_audience: this.campaignForm.campaignForm.controls.targetAudience.value as string,
      supervisor: this.campaignForm.campaignForm.controls.supervisor.value as string,
      goals: this.campaignForm.campaignForm.controls.goals.value as string,
      start_date: this.campaignForm.campaignForm.controls.startDate.value,
      end_date: this.campaignForm.campaignForm.controls.endDate.value,
      campaign_status: this.campaignForm.campaignForm.controls.campaignStatus.value as string,
    }

    console.log(data);
    this.isCampaignSaving = true;

    this.markettingApi.postCampaign(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isCampaignSaving = false;

          sessionStorage.setItem('shop_campaign_id', res.id);
          this.router.navigateByUrl('/home/marketting/view-campaign');
        },
        error: (err) => {
          console.log(err);
          this.isCampaignSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

}
