import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { CampaignFormComponent } from '../campaign-form/campaign-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { MarkettingApiService } from 'projects/shop/src/app/services/modules-api/marketting-api/marketting-api.service';
// import { MarkettingPrintService } from 'projects/shop/src/app/services/modules-printing/marketting-print/marketting-print.service';

// import { Campaign } from 'projects/shop/src/app/models/modules/marketting/marketting.model';


@Component({
  selector: 'app-view-campaign',
  templateUrl: './view-campaign.component.html',
  styleUrls: ['./view-campaign.component.scss']
})
export class ViewCampaignComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private markettingApi: MarkettingApiService,
    // private markettingPrint: MarkettingPrintService,
  ) { }

  @ViewChild('campaignFormComponentReference', { read: CampaignFormComponent, static: false }) campaignForm!: CampaignFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Marketting", url: "/home/marketting/all-campaigns" },
    { text: "View Campaign", url: "/home/marketting/view-campaign" },
  ];

  campaignData: any;

  isCampaignLoading = false;
  isCampaignSaving = false;
  isCampaignDeleting = false;

  ngOnInit(): void {
    this.getCampaign();
  }

  getCampaign(){
    this.isCampaignLoading = true;

    this.markettingApi.getCampaign()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.campaignData = res;
          this.isCampaignLoading = false;

          this.campaignForm.campaignForm.controls.campaignCode.setValue(this.campaignData.campaign_code);
          this.campaignForm.campaignForm.controls.campaignName.setValue(this.campaignData.campaign_name);
          this.campaignForm.campaignForm.controls.campaignType.setValue(this.campaignData.campaign_type);
          this.campaignForm.campaignForm.controls.goals.setValue(this.campaignData.goals);
          this.campaignForm.campaignForm.controls.supervisor.setValue(this.campaignData.supervisor);
          this.campaignForm.campaignForm.controls.targetAudience.setValue(this.campaignData.target_audience);
          this.campaignForm.campaignForm.controls.startDate.setValue(this.campaignData.start_date);
          this.campaignForm.campaignForm.controls.endDate.setValue(this.campaignData.end_date);
          this.campaignForm.campaignForm.controls.campaignStatus.setValue(this.campaignData.campaign_status);
        },
        error: (err) => {
          console.log(err);
          this.isCampaignLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putCampaign(){
    console.log('u are saving a new campaign');

    // let data: Campaign = {
    let data = {
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

    this.markettingApi.putCampaign(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isCampaignSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isCampaignSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteCampaign(){
    this.isCampaignDeleting = true;

    this.markettingApi.deleteCampaign()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/marketting/all-marketting');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.markettingPrint.printViewCampaign();
  }
  
}
